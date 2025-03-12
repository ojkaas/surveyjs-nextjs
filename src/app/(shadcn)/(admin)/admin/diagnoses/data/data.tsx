import OptometristIcon from '@/components/icons/optometrist-icon'
import { EyeOpenIcon, HomeIcon } from '@radix-ui/react-icons'
import { FaUserDoctor } from 'react-icons/fa6'
import { LuBrain } from 'react-icons/lu'

export const personsToContact = [
  {
    value: 'OOGARTS',
    label: 'Oogarts',
    icon: EyeOpenIcon,
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
    icon: LuBrain,
  },
]

export const personsToContactZiekenhuis = [
  {
    value: 'OOGARTS',
    label: 'Oogarts',
    icon: EyeOpenIcon,
  },
  {
    value: 'OPTOMETRIST',
    label: 'Optometrist',
    icon: OptometristIcon,
  },
  {
    value: 'ORTHOPTIST',
    label: 'Orthoptist',
    icon: OptometristIcon,
  },
  {
    value: 'BASISARTS',
    label: 'Basisarts',
    icon: FaUserDoctor,
  },
]
