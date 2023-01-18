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
    <div className="auth-page">
      <div className="auth-page__bg-signup"></div>
      <div className="auth-page__login">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-11 lg:grid-cols-11">
          <div className="col-span-1 sm:col-span-1 md:col-span-6 lg:col-span-6">
            <div className="auth-page__form">
              <div className="flex justify-center mb-[26px] sm:mb-10 h-[66px] sm:h-auto">
                <Logo />
              </div>

              <div className="text-center">
                <h1 className="mb-2 text-3xl font-bold text-vision-dark-blue text-[22px] sm:text-[30px]">
                  Signup for an Account
                </h1>

                <span className="text-[#747474] whitespace-pre sm:whitespace-normal">Start your 14 day trial. {"\n"}
                  No credit card account.</span>
                <Form className="sign-up-mobile-view-form w-full sm:w-full md:w-400 lg:w-455" onSubmit={handleSubmit}>
                  {error && (
                    <Alert variation="error" className="mb-3 text-left w-full sm:w-full md:w-400 lg:w-455">
                      {error}
                    </Alert>
                  )}
                  <div className="flex flex-row gap-2 w-full">
                    
                      <FormInput
                        name="firstname"
                        className="w-1/2 px-5 py-3 rounded-xl bg-[#ECECEC] placeholder-black"
                        placeholder="First Name"
                        onChange={(e: any) => setFirstname(e.target.value)}
                      />
                
                      <FormInput
                        name="lastname"
                        className="w-1/2 px-5 py-3 rounded-xl bg-[#ECECEC] placeholder-black"
                        placeholder="Last Name"
                        onChange={(e: any) => setLastname(e.target.value)}
                      />
                    
                  </div>
                  <FormInput
                    type={InputTypes.Email}
                    name="email"
                    className="w-full px-5 py-3 rounded-xl bg-[#ECECEC] placeholder-black"
                    placeholder="Email Address"
                    onChange={(e: any) => setEmail(e.target.value)}
                    required
                  />

                  <FormInput
                    type={InputTypes.Password}
                    name="password"
                    className="w-full px-5 py-3  rounded-xl bg-[#ECECEC] placeholder-black"
                    placeholder="Password"
                    onChange={(e: any) => setPassword(e.target.value)}
                    required
                  />
                  <Button className='w-full' type={ButtonTypes.Submit} isLoading={isLoading}>
                    Signup
                  </Button>
                  {/* <FormInput
                    type={InputTypes.Checkbox}
                    name="terms"
                    id="agree-to-terms"
                    className="w-full px-5 py-3  rounded-xl bg-slate-200"
                    placeholder="I agree to Terms and Conditions"              
                    required
                  /> */}
                </Form>

                <span className="block mx-auto mb-3 text-[#747474] whitespace-pre sm:whitespace-normal">
                  Already have an{'\n'}account?{' '}
                  <Link to={'/login'} className="font-bold text-vision-dark-blue">
                    Login
                  </Link>
                </span>          
              </div>
            </div>
          </div>
        </div>
      </div>

      <img className="auth-page__plant--1" src="/images/plant_1.svg" alt="" />
      <img className="auth-page__plant--2 invisible sm:invisible md:visible lg:visible " src="/images/plant_2.svg" alt="" />
      <img className="auth-page__plant--3" src="/images/plant_3.svg" alt="" />

      <div className='w-full'></div>
    </div>
  )
}

export default Signup
