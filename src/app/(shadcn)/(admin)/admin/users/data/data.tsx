import { ScissorsIcon, UserIcon, WrenchIcon } from '@heroicons/react/24/outline'

export const roles = [
  {
    value: 'ADMIN',
    label: 'Admin',
    icon: WrenchIcon,
  },
  {
    value: 'PORTAL',
    label: 'Specialist',
    icon: ScissorsIcon,
  },
  {
    value: 'USER',
    label: 'Gebruiker',
    icon: UserIcon,
  },
]
