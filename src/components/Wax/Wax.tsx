import {memo} from 'react'
import { MyTitle } from '../MyTitle'


// Мемоизируем + мемоизируем пропсы
export const Wax = memo(({cb}: {cb: () => void}) => {

  cb()  
  return (
    <div>
        <MyTitle variant='h6' sx={{border: '1px solid'}}> FAKE COMPONENT </MyTitle>
    </div>
  )
})


