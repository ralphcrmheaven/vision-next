import { Link, Navigate } from 'react-router-dom'
import { FormEvent, useState } from 'react'
import { Alert } from '@aws-amplify/ui-react'

import Logo from '../components/Logo'
import Form from '../components/form/Form'
import FormInput, { InputTypes } from '../components/form/FormInput'
import Button, { ButtonTypes } from '../components/Button'

import cham3 from '../assets/images/cham3.png'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, selectUser } from '../redux/features/userSlice'

const Login: React.FC = () => {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setErrror] = useState<string>('')

  if (user.username) {
    return <Navigate to={'/home'} replace />
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    setIsLoading(true)
    setErrror('')

    const data = {
      username,
      password,
    }

    const { error } = await dispatch(loginUser(data))

    if (error) {
      setErrror(error.message)
    }

    setIsLoading(false)
  }

  return (
    <>
      <div className="mt-[11px] w-full sm:mt-14">
        <div className="flex justify-center mb-[26px] sm:mb-10 h-[66px] sm:h-auto">
          <Logo />
        </div>

        <div className="login-mobile-view sm:login-desktop-view">
          <h1 className="mb-2 text-3xl font-bold text-vision-dark-blue text-[22px] sm:text-[30px]">
            Login to your account
          </h1>

          <span className="text-[#747474] whitespace-pre sm:whitespace-normal">See the world right in front of you</span>

          <Form className="login-mobile-view-form sm:login-desktop-view-form" onSubmit={handleSubmit}>
            {error && (
              <Alert variation="error" className="mx-auto mb-3 text-left w-455">
                {error}
              </Alert>
            )}

            <FormInput
              name="username"
              className="px-5 py-3  rounded-xl bg-slate-200 sm:w-455 w-full"
              placeholder="Username"
              onChange={(e: any) => setUsername(e.target.value)}
              required
            />

            <FormInput
              type={InputTypes.Password}
              name="password"
              className="px-5 py-3 rounded-xl bg-slate-200 sm:w-455 w-full"
              placeholder="Password"
              onChange={(e: any) => setPassword(e.target.value)}
              required
            />

            <Button className='w-full' type={ButtonTypes.Submit} isLoading={isLoading}>
              Login
            </Button>
          </Form>

          <span className="block mx-auto mb-3 text-[#747474]">
            Don’t have an account yet?{' '}
            <Link to={'/signup'} className="font-bold text-vision-dark-blue">
              Signup
            </Link>
          </span>

          <span className="text-[#747474]">
            Forgot Password?{' '}
            <Link
              to={'/forgot-password'}
              className="font-bold text-vision-dark-blue"
            >
              Click here
            </Link>
          </span>

          <img
            src={cham3}
            alt="Camera"
            className="mobile-view-cham3-img sm:desktop-view-cham3-img"
          />
        </div>
      </div>
    </>
  )
}
export default Login
