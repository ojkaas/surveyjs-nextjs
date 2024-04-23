import { CheckIcon, LockClosedIcon, LockOpen1Icon } from '@radix-ui/react-icons'

export const availables = [
  {
    value: true,
    label: 'Beschikbaar',
    icon: LockOpen1Icon,
  },
  {
    value: false,
    label: 'Afgesloten',
    icon: LockClosedIcon,
  },
]

export const finisheds = [
  {
    value: true,
    label: 'Afgerond',
    icon: CheckIcon,
  },
  {
    value: false,
    label: 'Open',
    icon: LockOpen1Icon,
  },
]
