import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './rootReducer'
import { useDispatch, useSelector  } from 'react-redux'
// RTK
import { RTKQueryMoviesApi } from './rtk_query'

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

export {store}