import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Auth } from 'aws-amplify'
import { clearLocalStorage, setLocalStorage } from '../../utils/localStorage'

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
    const response = await Auth.signIn(data.username, data.password)
    const user = await Auth.currentUserPoolUser()

    console.log(user)

    return response
  }
)
export interface ISignupUser {
  firstname: string
  lastname: string
  username: string
  email: string
  password: string
}

export const signupUser: any = createAsyncThunk(
  'auth/signup',
  async (data: ISignupUser) => {
    return await Auth.signUp({
      username: data.username,
      password: data.password,
      attributes: {
        given_name: data.firstname,
        family_name: data.lastname,
        email: data.email,
      },
    })
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.username = null
      clearLocalStorage()
    },
  },
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

export const { logoutUser } = userSlice.actions

export default userSlice.reducer
