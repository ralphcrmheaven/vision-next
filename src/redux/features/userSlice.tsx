import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Auth } from 'aws-amplify'
import { setLocalStorage } from '../../utils/localStorage'

const initialState = {
  username: null,
  loading: false,
}

export interface ILoginUser {
  username: string
  password: string
}

export const loginUser: any = createAsyncThunk(
  'auth/login',
  async (data: ILoginUser) => {
    return await Auth.signIn(data.username, data.password)
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true
    })

    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      const username = payload.username

      state.username = username
      state.loading = false

      setLocalStorage('username', username)
    })
  },
})

export const selectUser = (state: any) => state.user

export default userSlice.reducer
