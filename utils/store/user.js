import {
  createSlice,
} from '@reduxjs/toolkit'

const initialState = {
  value: {},
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      let newUser = action.payload

      return {
        ...state,
        value: newUser,
      }
    },
    resetUser: (state, action) => {
      return {
        ...state,
        value: {},
      }
    },
  },
})

const {
  actions,
  reducer: userReducer,
} = userSlice

export const {
  setUser,
  resetUser,
} = actions

export default userReducer
