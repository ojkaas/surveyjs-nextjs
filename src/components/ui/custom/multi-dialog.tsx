import { DialogProps } from '@radix-ui/react-dialog'
import { Slot, SlotProps } from '@radix-ui/react-slot'
import { Children, cloneElement, createContext, useCallback, useContext, useMemo, useState, type JSX } from 'react'

type Maybe<T> = T | null | undefined

const MultiDialogContainerContext = createContext<unknown>(null)
MultiDialogContainerContext.displayName = 'MultiDialogContainerContext'

export function useMultiDialog<T = unknown>(): [Maybe<T>, React.Dispatch<React.SetStateAction<Maybe<T>>>]
export function useMultiDialog<T = unknown>(v: T): [boolean, (v: boolean) => void]
export function useMultiDialog<T = unknown>(v?: T) {
  const s = useContext(MultiDialogContainerContext) as [Maybe<T>, React.Dispatch<React.SetStateAction<Maybe<T>>>]
  if (!s) throw new Error("Cannot use 'useMultiDialog' outside 'MultiDialogProvider'.")
  if (v == null) return s

  const [dialog, setDialog] = s

  // eslint-disable-next-line react-hooks/rules-of-hooks, react-hooks/exhaustive-deps
  const onOpenChange = useCallback((o: boolean) => (o ? setDialog(v) : setDialog(null)), [v])

  const open = dialog === v
  // eslint-disable-next-line react-hooks/rules-of-hooks, react-hooks/exhaustive-deps
  const result = useMemo(() => [open, onOpenChange] as const, [open])

  return result
}

export function MultiDialogTrigger<T = unknown>({
  value,
  onClick,
  condition,
  action,
  ...props
}: SlotProps &
  React.RefAttributes<HTMLElement> & {
    value: T
    condition?: () => boolean
    action?: () => void
  }) {
  const [, open] = useMultiDialog(value)

  const handleClick = useCallback<React.MouseEventHandler<HTMLElement>>(
    (e) => {
      e.preventDefault()
      if (condition && action) {
        if (condition()) {
          action()
        } else {
          open(true)
        }
      } else {
        open(true)
      }
      onClick && onClick(e)
    },
    [condition, action, open, onClick]
  )

  return <Slot onClick={handleClick} {...props} />
}

export function MultiDialogContainer<T = unknown>({
  value,
  children,
  ...props
}: Omit<DialogProps, 'open' | 'onOpenChange'> & {
  value: T
  children?: JSX.Element
}) {
  const [open, onOpenChange] = useMultiDialog(value)

  return useMemo(() => {
    Children.only(children)
    return children
      ? cloneElement(children, {
          ...props,
          open,
          onOpenChange,
        })
      : null
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children, open])
}

type Builder<T = unknown> = {
  readonly Trigger: (...args: Parameters<typeof MultiDialogTrigger<T>>) => React.ReactNode
  readonly Container: (...args: Parameters<typeof MultiDialogContainer<T>>) => React.ReactNode
  closeDialog: (id: string) => void
}

const builder = {
  Trigger: MultiDialogTrigger,
  Container: MultiDialogContainer,
} as const

export type MultiDialogBuilder<T = unknown> = (builder: Builder<T>) => React.ReactNode
export function MultiDialog<T = unknown>({ defaultOpen = null, children }: { defaultOpen?: T | null; children?: React.ReactNode | MultiDialogBuilder<T> }) {
  const [state, setState] = useState<T | null>(defaultOpen)

  const c = useMemo(() => {
    if (typeof children === 'function') {
      return children({
        ...builder,
        closeDialog: (id: string) => setState((currState) => (currState === id ? null : currState)),
      })
    }
    return children
  }, [children])

  return <MultiDialogContainerContext.Provider value={[state, setState]}>{c}</MultiDialogContainerContext.Provider>
}
