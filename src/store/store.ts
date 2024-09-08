import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './rootReducer'
import { useDispatch, useSelector  } from 'react-redux'
// RTK
import { Top250MoviesApi } from './rtk_query'

const store = configureStore({
  reducer: {
    ...rootReducer,
    [Top250MoviesApi.reducerPath]: Top250MoviesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(Top250MoviesApi.middleware),
})
export type RootState = ReturnType<typeof store.getState>
export const useAppSelector = useSelector.withTypes<RootState>()

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

export {store}