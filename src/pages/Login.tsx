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
    return <Navigate to={'/'} replace />
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
      <div className="mt-14">
        <div className="flex justify-center mb-10">
          <Logo />
        </div>

        <div className="relative mx-auto text-center bg-white w-972 rounded-3xl px-9 pt-14 pb-36">
          <h1 className="mb-2 text-3xl font-bold text-vision-dark-blue">
            Login to your account test
          </h1>

          <span>See the world right in front of you</span>

          <Form className="mt-10 mb-8" onSubmit={handleSubmit}>
            {error && (
              <Alert variation="error" className="mx-auto mb-3 text-left w-455">
                {error}
              </Alert>
            )}

            <FormInput
              name="username"
              className="px-5 py-3 mb-3 rounded-xl bg-slate-200 w-455"
              placeholder="Username"
              onChange={(e: any) => setUsername(e.target.value)}
              required
            />

            <FormInput
              type={InputTypes.Password}
              name="password"
              className="px-5 py-3 mb-3 rounded-xl bg-slate-200 w-455"
              placeholder="Password"
              onChange={(e: any) => setPassword(e.target.value)}
              required
            />

            <Button type={ButtonTypes.Submit} isLoading={isLoading}>
              Login
            </Button>
          </Form>

          <span className="block mx-auto mb-3">
            Don’t have an account yet?{' '}
            <Link to={'/signup'} className="font-bold text-vision-dark-blue">
              Signup
            </Link>
          </span>

          <span>
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
            className="absolute -left-220px top-100px"
          />
        </div>
      </div>
    </>
  )
}
export default Login
