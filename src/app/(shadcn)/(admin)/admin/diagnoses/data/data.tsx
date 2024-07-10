import BrainIcon from '@/components/icons/brain-icon'
import OptometristIcon from '@/components/icons/optometrist-icon'
import { EyeIcon } from '@heroicons/react/24/outline'
import { HomeIcon } from '@radix-ui/react-icons'

export const personsToContact = [
  {
    value: 'OOGARTS',
    label: 'Oogarts',
    icon: EyeIcon,
  },
  {
    value: 'OPTOMETRIST',
    label: 'Optometrist',
    icon: OptometristIcon,
  },
  {
    value: 'HUISARTS',
    label: 'Huisarts',
    icon: HomeIcon,
  },
  {
    value: 'OPTICIEN',
    label: 'Opticien',
    icon: OptometristIcon,
  },
  {
    value: 'ORTHOPTIST',
    label: 'Orthoptist',
    icon: OptometristIcon,
  },
  {
    value: 'NEUROLOOG',
    label: 'Neuroloog',
    icon: BrainIcon,
  },
]
