import { FieldErrors } from 'react-hook-form'

type Props = {
  errors: FieldErrors<any>
}

const DebugErrorsPanel = ({ errors }: Props) => {
  return (
    <div>
      {errors && (
        <div className='errors'>
          {Object.keys(errors).map(
            (fieldName, index) =>
              errors[fieldName] && (
                <p key={index}>
                  {fieldName}: {String(errors[fieldName]?.message)}
                </p>
              )
          )}
        </div>
      )}
    </div>
  )
}

export default DebugErrorsPanel
