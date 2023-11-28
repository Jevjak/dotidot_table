import { rootReducer } from './reducer'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ thunk: true })
  },
  reducer: rootReducer
})

export default store
