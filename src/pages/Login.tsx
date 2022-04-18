import { Link, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Logo from '../components/Logo'
import Form from '../components/form/Form'
import FormInput, { InputTypes } from '../components/form/FormInput'
import Button, { ButtonTypes } from '../components/Button'

import cham3 from '../assets/images/cham3.png'
import { useAuthContext } from '../contexts/AuthContext'
// import { Auth } from 'aws-amplify'
import { SubmitHandler, useForm } from 'react-hook-form'

type FormData = {
  username: string
  password: string
}

const Login = () => {
  const { auth, setAuth } = useAuthContext()
  const [isLoading] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  if (auth.isAuthenticated) {
    return <Navigate to={'/'} replace />
  }

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data)

    // setIsLoading(true)

    // try {
    //   const user = await Auth.signIn('albertgaya', 'P@ssw0rd1231')

    //   console.log(user)
    // } catch (error) {
    //   console.log(error)
    // }

    setAuth({
      ...auth,
      isAuthenticated: true,
    })
  }

  return (
    <>
      <div className="mt-14">
        <div className="flex justify-center mb-10">
          <Logo />
        </div>

        <div className="bg-white mx-auto w-972 rounded-3xl px-9 pt-14 pb-36 text-center relative">
          <h1 className="text-vision-dark-blue font-bold text-3xl mb-2">
            Login to your account
          </h1>

          <span>See the world right in front of you</span>

          <Form className="mt-10 mb-8" onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              name="username"
              className="rounded-xl bg-slate-200 py-3 px-5 w-455 mb-3"
              placeholder="Username"
              error={errors.username?.message ? errors.username.message : ''}
            />

            <FormInput
              type={InputTypes.Password}
              name="password"
              className="rounded-xl bg-slate-200 py-3 px-5 w-455 mb-3"
              placeholder="Password"
              error={errors.password?.message}
            />

            <Button type={ButtonTypes.Submit} isLoading={isLoading}>
              Login
            </Button>
          </Form>

          <span className="block mx-auto mb-3">
            Don’t have an account yet?{' '}
            <Link to={'/signup'} className="text-vision-dark-blue font-bold">
              Signup
            </Link>
          </span>

          <span>
            Forgot Password?{' '}
            <Link
              to={'/forgot-password'}
              className="text-vision-dark-blue font-bold"
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
