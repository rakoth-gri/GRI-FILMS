import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './rootReducer'
import { useDispatch, useSelector  } from 'react-redux'
// RTK
import { RTKQueryMoviesApi } from './rtk_query'
import { ROOT } from '../consts/api'

const store = configureStore({
  reducer: {
    ...rootReducer,
    [RTKQueryMoviesApi.reducerPath]: RTKQueryMoviesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(RTKQueryMoviesApi.middleware),
})
export type RootState = ReturnType<typeof store.getState>
export const useAppSelector = useSelector.withTypes<RootState>()

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

// ПОДПИСЧИК НА ИЗМЕНЕНИЕ ТЕМЫ -------
store.subscribe(() => {  
  const theme = store.getState().themeSliceReducer.theme
  ROOT.style.setProperty('--app-default-color', `var(--app-${theme}-color)`)
  ROOT.style.setProperty('--app-default-bg', `var(--app-${theme}-bg)`)
})

export {store}