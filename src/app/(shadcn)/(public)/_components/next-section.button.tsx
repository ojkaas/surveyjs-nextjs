'use client'
import { ChevronDownIcon } from '@radix-ui/react-icons'

type Props = {
  nextSectionId: string
}

const NextSectionButton = ({ nextSectionId }: Props) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(nextSectionId)
    element?.scrollIntoView({ block: 'start', inline: 'nearest', behavior: 'smooth' })
  }

  return (
    <div className='hidden pt-16 lg:flex items-center justify-center space-x-2'>
      <button
        onClick={() => {
          scrollToSection(nextSectionId)
        }}
      >
        <ChevronDownIcon className='w-12 h-12 text-primary' />
      </button>
    </div>
  )
}

export default NextSectionButton
