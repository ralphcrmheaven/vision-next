import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Auth } from 'aws-amplify'
import { clearLocalStorage, setLocalStorage } from '../../utils/localStorage'

export interface IUser {
  username: string
  given_name: string
  family_name: string
  email: string
}

const initialState: IUser = {
  username: '',
  given_name: '',
  family_name: '',
  email: '',
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
export interface ISignupUser {
  firstname: string
  lastname: string
  email: string
  password: string
}

export const signupUser: any = createAsyncThunk(
  'auth/signup',
  async (data: ISignupUser) => {
    return await Auth.signUp({
      username: data.email,
      password: data.password,
      attributes: {
        given_name: data.firstname,
        family_name: data.lastname,
        email: data.email,
      },
    })
  }
)
export interface IConfirmSignup {
  username: string
  code: string
}

export const confirmSignup: any = createAsyncThunk(
  'auth/confirm',
  async (data: IConfirmSignup) => {
    return await Auth.confirmSignUp(data.username, data.code)
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.username = ''
      state.given_name = ''
      state.family_name = ''
      state.email = ''
      clearLocalStorage()
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      console.log(payload)

      state.username = payload.username

      if (payload.attributes) {
        state.given_name = payload.attributes.given_name ?? 'Juan'
        state.family_name = payload.attributes.family_name ?? 'Dela Cruz'
        state.email = payload.attributes.email
      }

      setLocalStorage('username', state)
    })
  },
})

export const selectUser = (state: any) => state.user

export const { logoutUser } = userSlice.actions

export default userSlice.reducer
