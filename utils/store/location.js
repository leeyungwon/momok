import {
  createSlice,
} from '@reduxjs/toolkit'

const initialState = {
  value: {},
}

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocation: (state, action) => {
      let newLocation = action.payload

      return {
        ...state,
        value: newLocation,
      }
    },
  },
})

const {
  actions,
  reducer: locationReducer,
} = locationSlice

export const {
  setLocation,
} = actions

export default locationReducer
