import { HTMLAttributes, ReactNode } from 'react'
import "./Span.sass"

interface I_Span extends HTMLAttributes<HTMLSpanElement> {
    children: ReactNode
    cls: string
}

export const Span = ({children, cls, ...props}: I_Span) => {
  return (
    <span {...props} className={`span ${cls}`}>
      {children}
    </span>
  )
}


