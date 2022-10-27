import {
  configureStore,
} from '@reduxjs/toolkit'

import userReducer from './user'
import locationReducer from './location'

export const store = configureStore({
  reducer: {
    user: userReducer,
    location: locationReducer,
  },
})
