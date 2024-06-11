import { revalidateTag } from 'next/cache'

export class RevalidationIdentifier {
  public static readonly DIAGNOSES = 'diagnoses'
  public static readonly USERS = 'users'
  public static readonly IMAGES = 'images'

  public static readonly SURVEY_DEFINITIONS = 'survey-definitions'
  public static readonly ACTIVE_SURVEY = 'active-survey'
  public static readonly WEIGHTED_DIAGNOSES = 'weighted-diagnoses'
  public static readonly SURVEY_PAGE = 'survey-page'
  public static readonly SURVEY_QUESTION = 'survey-question'
  public static readonly SURVEY = 'survey'
  public static readonly SURVEYS = 'surveys'
}

export class RevalidationHelper {
  public static revalidateTag(tag: string) {
    revalidateTag(tag)
  }

  public static revalidateDiagnoses() {
    this.revalidateTag(RevalidationIdentifier.DIAGNOSES)
  }

  public static revalidateUsers() {
    this.revalidateTag(RevalidationIdentifier.USERS)
  }

  public static revalidateImages() {
    this.revalidateTag(RevalidationIdentifier.IMAGES)
  }

  public static revalidateAfterSurveyDefinitionChange() {
    this.revalidateTag(RevalidationIdentifier.SURVEY_DEFINITIONS)
    this.revalidateTag(RevalidationIdentifier.ACTIVE_SURVEY)
    this.revalidateTag(RevalidationIdentifier.WEIGHTED_DIAGNOSES)
    this.revalidateTag(RevalidationIdentifier.SURVEY)
    this.revalidateTag(RevalidationIdentifier.SURVEYS)
    this.revalidateTag(RevalidationIdentifier.SURVEY_QUESTION)
    this.revalidateTag(RevalidationIdentifier.SURVEY_PAGE)
  }

  public static revalidateAll() {
    this.revalidateDiagnoses()
    this.revalidateUsers()
    this.revalidateImages()
    this.revalidateAfterSurveyDefinitionChange()
  }
}
