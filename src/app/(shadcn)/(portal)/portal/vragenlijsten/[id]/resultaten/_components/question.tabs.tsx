'use client'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SurveyJson } from '@/lib/surveyjs/types'
import { cn } from '@/lib/utils'
import { DocumentIcon } from '@heroicons/react/24/outline'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { useState } from 'react'

type Props = {
  questions: SurveyJson
}

const QuestionTabs = ({ questions }: Props) => {
  const [isOverflowing, setIsOverflowing] = useState(false)

  /*
  useEffect(() => {
    const handleResize = () => {
      const container = document.getElementById('tab-container')
      console.log('Widths: ', container?.scrollWidth, container?.clientWidth)
      if (container && container.scrollWidth > container.clientWidth) {
        setIsOverflowing(true)
      } else {
        setIsOverflowing(false)
      }
    }
    console.log('useEffect')
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])*/

  return (
    <div className='mt-8'>
      <h3 className='text-lg font-bold mb-4'>Vragenlijst antwoorden</h3>
      <Tabs defaultValue='page1'>
        <TabsList id='tab-container' className={cn('border-b hidden border-gray-200 overflow-hidden md:flex')}>
          {questions.pages.map((page, index) => {
            return (
              <TabsTrigger key={`tabtrigger${index}`} value={`page${index + 1}`}>
                {page.title}
              </TabsTrigger>
            )
          })}
        </TabsList>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant='default' className='flex md:hidden bg-muted hover:bg-slate-400 text-muted-foreground data-[state=open]:bg-muted'>
              <DocumentIcon className='mr-2 h-4 w-4' />
              <span>Kies pagina</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <TabsPrimitive.List>
              {questions.pages.map((page, index) => {
                return (
                  <DropdownMenuItem key={`dropdowntrigger${index}`}>
                    <TabsTrigger value={`page${index + 1}`}>{page.title}</TabsTrigger>
                  </DropdownMenuItem>
                )
              })}
            </TabsPrimitive.List>
          </DropdownMenuContent>
        </DropdownMenu>
        {questions.pages.map((page, index) => {
          return (
            <TabsContent key={`tabcontent${index}`} value={`page${index + 1}`}>
              <div className='space-y-4'>
                {page.elements.map((question, index) => {
                  return (
                    <div className='gap-2' key={`question${index}`}>
                      <h4 className='font-semibold'>{question.title ? question.title : question.name}</h4>
                      <p className=''>{question.answerText ? question.answerText : question.answer}</p>
                    </div>
                  )
                })}
              </div>
            </TabsContent>
          )
        })}
      </Tabs>
    </div>
  )
}

export default QuestionTabs
