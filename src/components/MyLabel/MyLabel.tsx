import { HTMLAttributes, ReactNode } from 'react'
import "./MyLabel.sass"

interface I_AgeRating extends HTMLAttributes<HTMLSpanElement> {
    children: ReactNode    
}

export const MyLabel = ({children, ...props}: I_AgeRating) => {
  return (
    <span {...props} className='myLabel'>
      {children}
    </span>
  )
}


