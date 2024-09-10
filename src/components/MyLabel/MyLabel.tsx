import { HTMLAttributes, ReactNode } from 'react'
import "./MyLabel.sass"
import { SxProps, Typography } from '@mui/material'

interface I_AgeRating extends HTMLAttributes<HTMLSpanElement> {
    children: ReactNode
    sx?: SxProps | undefined    
}

export const MyLabel = ({children, ...props}: I_AgeRating) => {
  return (
    <Typography {...props}  className='myLabel' component={'span'}>
      {children}
    </Typography>
  )
}


