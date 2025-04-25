import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { employeesAPI } from '@/store/services/EmployeesService'

import employeesReducer from './reducers/EmployeeSlice'

const rootReducer = combineReducers({
  employeesReducer,
  [employeesAPI.reducerPath]: employeesAPI.reducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(employeesAPI.middleware),
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
