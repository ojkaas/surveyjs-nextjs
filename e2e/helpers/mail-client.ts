import { MailhogClient } from 'mailhog-awesome'

export class MailhogClientService {
  private mailhog: MailhogClient
  private static instance: MailhogClientService

  constructor(port?: number) {
    // Initialize the mailhog client here
    this.mailhog = new MailhogClient({
      host: process.env.EMAIL_SERVER_HOST,
      port: port ? port : 8025,
    })
  }

  public static getInstance(port?: number): MailhogClientService {
    if (!MailhogClientService.instance) {
      MailhogClientService.instance = new MailhogClientService(port)
    }

    return MailhogClientService.instance
  }

  getMailhog(): MailhogClient {
    return this.mailhog
  }
}
