import { SurveyDefinitionWithAllDetails } from '@/app/(shadcn)/(admin)/admin/survey-definitions/_actions/update-survey-definition'
import { ValidationResponse } from '@/components/forms/validate-and-execute.button'
import prisma from '@/db/db'
import { Choice, Page, Question, SurveyJson } from '@/lib/surveyjs/types'
import { Prisma, SurveyDefinition, SurveyQuestionOption } from '@prisma/client'
import { PageWithAllDetails, SurveyDataHelper } from './data.helpers'

const SUPPORTED_QUESTION_TYPES = ['boolean', 'checkbox', 'radiogroup', 'dropdown', 'imagepicker', 'rating', 'ranking']

const questionWithAnswersAndWeights = Prisma.validator<Prisma.SurveyQuestionDefaultArgs>()({
  include: { answers: { include: { weightedDiagnoses: true } } },
})
type QuestionWithAnswersAndWeights = Prisma.SurveyQuestionGetPayload<typeof questionWithAnswersAndWeights>

export function isObjectChoice(choice: Choice): choice is Exclude<Choice, string> {
  return typeof choice !== 'string'
}

export async function validateCreateDataStucture(surveyDefinition: SurveyDefinitionWithAllDetails, data: SurveyJson): Promise<ValidationResponse> {
  if (data && typeof data === 'object') {
    const errors = []
    const json = data as SurveyJson
    const allNewQuestions = json.pages.flatMap((page) => page.elements || []).filter((element) => SUPPORTED_QUESTION_TYPES.includes(element.type))
    const allOldQuestions = surveyDefinition.pages.flatMap((page) => page.questions)
    const questionsToCheckDetails: { old: QuestionWithAnswersAndWeights; new: Question }[] = []
    // Check if all old questions are still present in the new data structure
    //There are no old questions, so no need to check if anything needs to be copied
    if (allOldQuestions.length === 0) return { status: 'ok', title: 'Success' }

    for (const page of surveyDefinition.pages) {
      if (!page.title) errors.push('Page met nummer ' + page.number + ' heeft geen titel.')
    }

    for (const oldQuestion of allOldQuestions) {
      if (!allNewQuestions.find((newQuestion) => newQuestion.name === oldQuestion.question)) {
        errors.push(`Vraag '${oldQuestion.question}' is niet meer aanwezig.`)
      } else {
        questionsToCheckDetails.push({
          old: oldQuestion,
          new: allNewQuestions.find((newQuestion) => newQuestion.name === oldQuestion.question) as Question,
        })
      }
    }

    // Check if all existing questions have the same answers
    for (const question of questionsToCheckDetails) {
      if (question.old.type !== question.new.type) {
        errors.push(`Vraag '${question.old.question}' heeft een ander type gekregen.`)
        continue
      }

      if (question.new.type === 'boolean') {
        //skip checking answers for boolean questions
        continue
      }
      if (question.new.type === 'rating') {
        if (question.new.rateValues) {
          const oldRateValues = question.old.answers.map((answer) => answer.answer)
          const newRateValues = question.new.rateValues?.map((rateValue) => rateValue.value)

          if (oldRateValues.sort().join() !== newRateValues?.sort().join()) {
            errors.push(`Vraag '${question.old.question}' heeft andere antwoorden.`)
          }

          continue
        } else if (question.new.rateCount) {
          const newRateValues = []
          for (let i = 1; i <= question.new.rateCount; i++) {
            newRateValues.push(i)
          }
          const oldRateValues = question.old.answers.map((answer) => answer.answer)
          if (oldRateValues.sort().join() !== newRateValues.sort().join()) {
            errors.push(`Vraag '${question.old.question}' heeft andere antwoorden.`)
          }
        }
      }

      if (question.new.type === 'radiogroup' || question.new.type === 'dropdown' || question.new.type === 'imagepicker' || question.new.type === 'checkbox') {
        const oldChoices = question.old.answers.map((answer) => answer.answer)
        const newChoices = question.new.choices?.map((choice) => (isObjectChoice(choice) ? choice.value : choice))

        if (oldChoices.sort().join() !== newChoices?.sort().join()) {
          errors.push(`Vraag '${question.old.question}' heeft andere antwoorden.`)
        }
        continue
      }
    }

    if (errors.length > 0) {
      const linkedSurveys = await prisma.survey.count({ where: { surveyDefId: surveyDefinition.id } })

      const responseObject: ValidationResponse =
        linkedSurveys > 0
          ? { status: 'error', message: 'Deze vragenlijst is al in gebruik, er kunnen daarom geen vragen/antwoorden worden toegevoegd/verwijderd.', title: 'Foutmelding' }
          : {
              status: 'warning',
              message: 'Er zijn wijzigingen gedaan in de vragen of antwoorden, dit kan invloed hebben op al bepaalde gewichten. Bestaande gewichten voor gewijzigde vragen zullen worden verwijderd!',
              title: 'Waarschuwing',
            }

      return { ...responseObject, detailedErrors: errors }
    }
  }
  return { status: 'ok', title: 'Success' }
}

export async function createOrUpdateSurveyDefinitionDataStructure(surveyDefinition: SurveyDefinition, copyOfId?: string) {
  if (surveyDefinition.data && typeof surveyDefinition.data === 'object') {
    const existingPages = await SurveyDataHelper.fetchExistingSurveyPages(copyOfId ? copyOfId : surveyDefinition.id)
    const surveyJson = surveyDefinition.data as SurveyJson
    await createSurveyPagesAndQuestions(surveyDefinition.id, surveyJson.pages, existingPages, copyOfId)

    if (existingPages.length > 0 && !copyOfId) {
      await deleteRemovedPagesAndQuestions(surveyDefinition.id, existingPages, surveyDefinition.data as SurveyJson)
    }

    return surveyDefinition
  }
}

async function deleteRemovedPagesAndQuestions(surveyDefId: string, existingPages: PageWithAllDetails[], surveyJson: SurveyJson) {
  const newPageTitles = surveyJson.pages.map((page) => page.title)
  const allOldQuestions = existingPages.flatMap((page) => page.questions)
  const allNewQuestions = surveyJson.pages.flatMap((page) => page.elements || []).filter((element) => SUPPORTED_QUESTION_TYPES.includes(element.type))

  const deletedPages = existingPages.filter((page) => !newPageTitles.includes(page.title!))
  for (const page of deletedPages) {
    await SurveyDataHelper.deleteSurveyPage(page.id)
  }

  for (const oldQuestion of allOldQuestions) {
    if (!allNewQuestions.find((newQuestion) => newQuestion.name === oldQuestion.question)) {
      SurveyDataHelper.deleteSurveyQuestion(oldQuestion.id)
    }
  }
}

async function createSurveyPagesAndQuestions(surveyDefId: string, pages: Page[], existingPages: PageWithAllDetails[], copyOfId?: string) {
  const allOldQuestions = existingPages.flatMap((page) => page.questions)

  let pageId = 1

  for (const page of pages) {
    if (!page.title) page.title = `Pagina${pageId}`
    const oldPage = existingPages.find((existingPage) => existingPage.title === page.title)
    const pageEntity = await SurveyDataHelper.createSurveyPage(surveyDefId, page.title, pageId)

    if (page.elements) {
      let questionId = 1
      for (const question of page.elements) {
        if (SUPPORTED_QUESTION_TYPES.includes(question.type)) {
          const oldQuestion = allOldQuestions.find((oldQuestion) => oldQuestion.question === question.name)
          const questionEntity = await SurveyDataHelper.createSurveyQuestion(surveyDefId, pageEntity.id, question, questionId)
          const newQuestionOptions = await createQuestionOptions(questionEntity.id, question)
          if (oldQuestion && areQuestionOptionsTheSame(oldQuestion, question)) {
            SurveyDataHelper.reattachWeightedDiagnoses(oldQuestion, newQuestionOptions)
          } else if (oldQuestion && !copyOfId) {
            await SurveyDataHelper.deleteSurveyQuestion(oldQuestion.id)
          }
        }
        questionId++
      }
    }

    if (oldPage) {
      const diagnoseIds = oldPage
        ? oldPage.activeDiagnoses.map((diagnose) => ({
            id: diagnose.id,
          }))
        : []
      await SurveyDataHelper.connectActiveDiagnoses(pageEntity.id, diagnoseIds)
      if (!copyOfId) await SurveyDataHelper.deleteSurveyPage(oldPage.id)
    }
    pageId++
  }
}

async function createQuestionOptions(surveyQuestionId: string, question: Question) {
  let questionOptions: SurveyQuestionOption[] = []
  switch (question.type) {
    case 'boolean':
      questionOptions = await createBooleanOptions(surveyQuestionId, question)
      break
    case 'rating':
      questionOptions = await createRatingOptions(surveyQuestionId, question)
      break
    default:
      questionOptions = await createDefaultOptions(surveyQuestionId, question)
      break
  }
  return questionOptions
}
async function createBooleanOptions(surveyQuestionId: string, question: Question) {
  const questionOptions: SurveyQuestionOption[] = []
  questionOptions.push(await SurveyDataHelper.createSurveyQuestionOption(surveyQuestionId, question.labelTrue || 'Ja', question.labelTrue || 'Ja'))
  questionOptions.push(await SurveyDataHelper.createSurveyQuestionOption(surveyQuestionId, question.labelFalse || 'Nee', question.labelFalse || 'Nee'))
  return questionOptions
}

async function createRatingOptions(surveyQuestionId: string, question: Question) {
  const questionOptions: SurveyQuestionOption[] = []
  if (question.rateValues) {
    for (const rateValue of question.rateValues) {
      questionOptions.push(await SurveyDataHelper.createSurveyQuestionOption(surveyQuestionId, rateValue.value.toString(), rateValue.text))
    }
  } else if (question.rateCount) {
    for (let i = 1; i <= question.rateCount; i++) {
      questionOptions.push(await SurveyDataHelper.createSurveyQuestionOption(surveyQuestionId, i.toString(), i.toString()))
    }
  }
  return questionOptions
}

async function createDefaultOptions(surveyQuestionId: string, question: Question) {
  const questionOptions: SurveyQuestionOption[] = []
  if (question.choices) {
    for (const choice of question.choices) {
      questionOptions.push(
        await SurveyDataHelper.createSurveyQuestionOption(
          surveyQuestionId,
          isObjectChoice(choice) ? choice.value : choice,
          isObjectChoice(choice) ? (choice.text ? choice.text : choice.value) : choice
        )
      )
    }
  }
  return questionOptions
}

function areQuestionOptionsTheSame(oldQuestion: QuestionWithAnswersAndWeights, newQuestion: Question): boolean {
  const errors = []
  if (oldQuestion.type !== newQuestion.type) {
    return false
  }

  if (newQuestion.type === 'boolean') {
    //skip checking answers for boolean questions
    return true
  }
  if (newQuestion.type === 'rating') {
    if (newQuestion.rateValues) {
      const oldRateValues = oldQuestion.answers.map((answer) => answer.answer)
      const newRateValues = newQuestion.rateValues?.map((rateValue) => rateValue.value)

      if (oldRateValues.sort().join() !== newRateValues?.sort().join()) {
        return false
      }
    } else if (newQuestion.rateCount) {
      const newRateValues = []
      for (let i = 1; i <= newQuestion.rateCount; i++) {
        newRateValues.push(i)
      }
      const oldRateValues = oldQuestion.answers.map((answer) => answer.answer)
      if (oldRateValues.sort().join() !== newRateValues.sort().join()) {
        return false
      }
    }
  }

  if (newQuestion.type === 'radiogroup' || newQuestion.type === 'dropdown' || newQuestion.type === 'imagepicker' || newQuestion.type === 'checkbox') {
    const oldChoices = oldQuestion.answers.map((answer) => answer.answer)
    const newChoices = newQuestion.choices?.map((choice) => (isObjectChoice(choice) ? choice.value : choice))

    if (oldChoices.sort().join() !== newChoices?.sort().join()) {
      return false
    }
  }
  return true
}
