'use server'

import { createSurveyActionSchema } from '@/app/(shadcn)/(portal)/portal/vragenlijsten/data/schema'
import prisma from '@/db/db'
import { authOptions } from '@/lib/config/auth/auth-options'
import { sendMail } from '@/lib/mailer/mail.transporter'
import { authPortalAction } from '@/lib/safe-actions'
import { Prisma } from '@prisma/client'
import { nanoid } from 'nanoid'
import { getServerSession } from 'next-auth'
import { revalidateTag } from 'next/cache'

export const createSurvey = authPortalAction(createSurveyActionSchema, async (surveyData) => {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      throw new Error('Session not found!')
    }

    let survey
    let retryCount = 0
    const maxRetries = 3

    const surveyDefintion = await prisma.surveyDefinition.findFirstOrThrow({ where: { active: true } })

    while (retryCount < maxRetries) {
      try {
        survey = await prisma.survey.create({ data: { user: { connect: { id: session.user.id } }, key: nanoid(10).toLocaleUpperCase(), surveyDefinition: { connect: { id: surveyDefintion.id } } } })
        break
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
          retryCount++
        } else {
          throw error
        }
      }
    }

    if (!survey) {
      throw new Error('Failed to create a unique survey key')
    }

    if (survey && surveyData.sendEmail) {
      sendMail({
        templateName: 'invite.hbs',
        templateData: { url: `${process.env.NEXTAUTH_URL}/survey/${survey.key}` },
        to: surveyData.email!,
        subject: 'Oogned - Triage vragenlijst',
      })
    }
    revalidateTag('surveys')
    return survey
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
    }
    console.error(e)
    throw e
  }
})
