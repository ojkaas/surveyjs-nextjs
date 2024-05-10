import { inviteHbs } from '@/lib/mailer/stupid-solution'
import Handlebars from 'handlebars'
import { createTransport } from 'nodemailer'

export const mailer = createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: parseInt(process.env.EMAIL_SERVER_PORT ?? ''),
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
  from: process.env.EMAIL_FROM,
  replyTo: process.env.EMAIL_FROM,
})

type SendEmailOptions = {
  to: string
  subject: string
  text?: string
  templateName: string
  templateData: { [key: string]: any }
}
export const sendMail = (options: SendEmailOptions) => {
  let emailTemplateSource = 'no template'

  if (options.templateName === 'invite.hbs') emailTemplateSource = inviteHbs
  //const emailTemplateSource = readFileSync(templatePath, 'utf8')
  //const emailTemplateSource = readFileSync(templatePath, 'utf8')
  //const emailTemplateSource = readFileSync(path.join(__dirname, '../../../handlebar/' + options.templateName), 'utf8')
  //const emailTemplateSource = readFileSync(process.cwd() + '/public/handlebar/invite.hbs', 'utf8')
  //const emailTemplateSource = readFileSync(path.resolve('./public', 'handlebar/invite.hbs'), 'utf8')

  const template = Handlebars.compile(emailTemplateSource)
  const html = template(options.templateData)

  mailer.sendMail({
    to: options.to,
    from: process.env.EMAIL_FROM,
    subject: options.subject,
    text: options.text ? options.text : 'Html only. Please enable html to view this email.',
    html: html,
  })
}
