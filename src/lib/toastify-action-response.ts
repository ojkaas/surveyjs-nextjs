import { toast } from 'sonner'

type PromiseResult<T> = {
  data?: T
  serverError?: string
  validationErrors?: Partial<Record<string, string[]>> | undefined // Adjusted type here
}

export interface ToastifyOptions<Data> {
  loadingMessage?: LoadingMessage
  successMessage?: SuccessMessage<Data>
}

type LoadingMessage = string
type SuccessMessage<T> = (data: T) => string | React.ReactNode

export function toastifyActionResponse<Data>(promise: Promise<PromiseResult<Data>>, options?: ToastifyOptions<Data>) {
  const { loadingMessage = 'Bezig...', successMessage = defaultSuccessMessage } = options ?? {}

  toast.promise(promise, {
    loading: loadingMessage,
    success: (result: PromiseResult<Data>) => {
      if (result.serverError) {
        throw new Error(result.serverError)
      }
      if (result.validationErrors) throw new Error('Validation error')
      if (result.data) {
        return successMessage(result.data)
      }
    },
    error: (error: Error) => {
      return error.message
    },
  })
}

// Default success message function
function defaultSuccessMessage<Data>(data: Data): string {
  return `Actie succesvol uitgevoegd`
}
