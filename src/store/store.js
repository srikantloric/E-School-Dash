import { configureStore } from '@reduxjs/toolkit'
// import counterReducer from './counterSlice'
import studentslice from './studentSlice'




export const store = configureStore({
    reducer: {
      student:studentslice,
  },
})