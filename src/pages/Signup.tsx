import React, { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Button, { ButtonTypes } from '../components/Button'
import Form from '../components/form/Form'
import FormInput, { InputTypes } from '../components/form/FormInput'
import Logo from '../components/Logo'

import cham3 from '../assets/images/cham3.png'
import { useDispatch } from 'react-redux'
import { signupUser } from '../redux/features/userSlice'
import { Alert } from '@aws-amplify/ui-react'

const Signup: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isLoading, setIsloading] = useState(false)
  const [firstname, setFirstname] = useState<string>('')
  const [lastname, setLastname] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    setIsloading(true)
    setError('')

    const data = {
      firstname,
      lastname,
      email,
      password,
    }

    const { error, payload } = await dispatch(signupUser(data))

    if (error) {
      setError(error.message)
      setIsloading(false)
    } else {
      navigate({
        pathname: '/verify-account',
        search: `?username=${payload.user.username}`,
      })
    }
  }

  return (
    <div className="mt-14">
      <div className="flex justify-center mb-10">
        <Logo />
      </div>

      <div className="relative mx-auto text-center bg-white w-972 rounded-3xl px-9 pt-14 pb-36">
        <h1 className="mb-2 text-3xl font-bold text-vision-dark-blue">
          Signup for an Account
        </h1>

        <span>Start your 14 day trial. No credit card account.</span>

        <Form className="mx-auto mt-10 mb-8 w-455" onSubmit={handleSubmit}>
          {error && (
            <Alert variation="error" className="mb-3 text-left">
              {error}
            </Alert>
          )}
          <div className="mb-3 columns-2">
            <div>
              <FormInput
                name="firstname"
                className="px-5 py-3 rounded-xl bg-slate-200"
                placeholder="First Name"
                onChange={(e: any) => setFirstname(e.target.value)}
              />
            </div>

            <div>
              <FormInput
                name="lastname"
                className="px-5 py-3 rounded-xl bg-slate-200"
                placeholder="Last Name"
                onChange={(e: any) => setLastname(e.target.value)}
              />
            </div>
          </div>
          <FormInput
            type={InputTypes.Email}
            name="email"
            className="w-full px-5 py-3 mb-3 rounded-xl bg-slate-200"
            placeholder="Email Address"
            onChange={(e: any) => setEmail(e.target.value)}
            required
          />

          <FormInput
            type={InputTypes.Password}
            name="password"
            className="w-full px-5 py-3 mb-3 rounded-xl bg-slate-200"
            placeholder="Password"
            onChange={(e: any) => setPassword(e.target.value)}
            required
          />
          <Button type={ButtonTypes.Submit} isLoading={isLoading}>
            Signup
          </Button>
        </Form>

        <span className="block mx-auto mb-3">
          Already have an account?{' '}
          <Link to={'/login'} className="font-bold text-vision-dark-blue">
            Login
          </Link>
        </span>

        <img
          src={cham3}
          alt="Camera"
          className="absolute -left-220px top-100px"
        />
      </div>
    </div>
  )
}

export default Signup
