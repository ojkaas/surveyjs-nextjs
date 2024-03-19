import { IconProps } from '@radix-ui/react-icons/dist/types'
import * as React from 'react'

export const OptometristIcon = React.forwardRef<SVGSVGElement, IconProps>(({ color = 'currentColor', ...props }, forwardedRef) => {
  //0 0 24 24
  return (
    <svg width='15' height='15' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...props} ref={forwardedRef}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M6.23717 4.71172C6.63012 4.58073 6.84249 4.15599 6.71151 3.76303C6.58052 3.37008 6.15578 3.15771 5.76282 3.28869L5.20803 3.47362C4.63714 3.6639 4.15321 3.82519 3.76907 4.00078C3.36027 4.18763 3.00244 4.41689 2.7176 4.77654C2.43275 5.13619 2.29154 5.53702 2.20328 5.97774C2.12035 6.39189 2.07418 6.89989 2.01972 7.49919L1.32246 15.1691C1.27528 15.4364 1.25046 15.7114 1.25 15.9922C1.25544 18.6109 3.38 20.7502 5.99999 20.7502C8.36324 20.7502 10.3234 19.0244 10.6889 16.7643L10.9079 16.6861C11.6142 16.4342 12.3858 16.4342 13.0921 16.6861L13.3111 16.7643C13.6766 19.0244 15.6367 20.7502 18 20.7502C20.62 20.7502 22.7445 18.6109 22.75 15.9922C22.7495 15.7114 22.7247 15.4364 22.6775 15.1691L21.9803 7.49918C21.9258 6.89989 21.8796 6.39189 21.7967 5.97774C21.7084 5.53702 21.5672 5.13619 21.2824 4.77654C20.9975 4.41689 20.6397 4.18763 20.2309 4.00078C19.8468 3.82519 19.3629 3.6639 18.792 3.47362L18.2372 3.28869C17.8442 3.15771 17.4195 3.37008 17.2885 3.76303C17.1575 4.15599 17.3699 4.58073 17.7628 4.71172L18.281 4.88444C18.8984 5.09023 19.3051 5.22686 19.6073 5.36502C19.8931 5.49565 20.0214 5.60032 20.1065 5.70785C20.1917 5.81537 20.2642 5.96415 20.3259 6.27228C20.3912 6.59815 20.431 7.02536 20.4899 7.67343L20.9052 12.242C20.1021 11.6202 19.0943 11.2502 18 11.2502C15.6549 11.2502 13.7067 12.9497 13.3198 15.1842C12.4577 14.9348 11.5423 14.9348 10.6802 15.1842C10.2933 12.9497 8.34511 11.2502 5.99999 11.2502C4.90572 11.2502 3.89787 11.6202 3.09474 12.242L3.14309 11.7102L3.51007 7.67343C3.56898 7.02536 3.60882 6.59815 3.67408 6.27228C3.73579 5.96415 3.80831 5.81537 3.89347 5.70785C3.97863 5.60032 4.10684 5.49565 4.39264 5.36502C4.69491 5.22686 5.10163 5.09023 5.71898 4.88444L6.23717 4.71172ZM21.1902 15.3764L21.2498 16.0325C21.2325 17.8126 19.7841 19.2502 18 19.2502C16.2051 19.2502 14.75 17.7951 14.75 16.0002C14.75 14.2053 16.2051 12.7502 18 12.7502C19.5816 12.7502 20.8993 13.8799 21.1902 15.3764ZM2.8098 15.3764L2.75015 16.0325C2.76749 17.8126 4.21585 19.2502 5.99999 19.2502C7.79492 19.2502 9.24999 17.7951 9.24999 16.0002C9.24999 14.2053 7.79492 12.7502 5.99999 12.7502C4.41842 12.7502 3.10071 13.8799 2.8098 15.3764Z'
        fill={color}
      ></path>
    </svg>
  )
})

OptometristIcon.displayName = 'OptometristIcon'

export default OptometristIcon
