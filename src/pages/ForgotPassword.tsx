import { Alert } from '@aws-amplify/ui-react'
import { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'

import Button, { ButtonTypes } from '../components/Button'
import Form from '../components/form/Form'
import FormInput, { InputTypes } from '../components/form/FormInput'

import cham3 from '../assets/images/cham3.png'
import Logo from '../components/Logo'
import { Auth } from 'aws-amplify'

function ForgotPassword() {
  const [isLoading, setIsloading] = useState(false)
  const [error, setError] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [isCodeSent, setIsCodeSent] = useState<boolean>(false)
  const [code, setCode] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')
  const [isSuccessReset, setIsSuccessReset] = useState<boolean>(false)

  const handleResetPassword = async () => {
    setIsloading(true)
    setError('')

    try {
      await Auth.forgotPassword(username)
      setIsCodeSent(true)
      setIsloading(false)
    } catch (e: any) {
      setError(e.message)
      setIsloading(false)
    }
  }

  const handleSetNewPassword = async () => {
    setIsloading(true)
    setError('')

    try {
      await Auth.forgotPasswordSubmit(username, code, newPassword)
      setIsSuccessReset(true)
    } catch (e: any) {
      setError(e.message)
      setIsloading(false)
    }
  }

  return (
    <div className="auth-page">
        {/* <div className="auth-page__bg-signup"></div> */}
        <img className="auth-page__image-1" src="/images/signup_image_clouds.svg" alt="" />
        <img className="auth-page__image-2" src="/images/login_image_animal.svg" alt="" />
        <img className="auth-page__image-3" src="/images/signup_image_grass.svg" alt="" />
        
        <div className="auth-page__login">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-11 lg:grid-cols-11">
            <div className="col-span-1 sm:col-span-1 md:col-span-6 lg:col-span-6">
              <div className="auth-page__form">
                <div className="flex justify-center mb-[26px] sm:mb-10 h-[66px] sm:h-auto">
                  <Logo />
                </div>

                <div className="text-center">
                  {isSuccessReset === false ? (
                    <>
                      <h1 className="mb-2 text-3xl font-bold text-vision-dark-blue text-[22px] sm:text-[30px]">
                        Forgot Password?
                      </h1>

                      <Form className="login-mobile-view-form sm:login-desktop-view-form" onSubmit={() => false}>
                        {error && (
                          <Alert variation="error" className="mb-3 text-left">
                            {error}
                          </Alert>
                        )}

                        <FormInput
                          type={InputTypes.Text}
                          name="username"
                          className="w-full px-5 py-3 mb-3 rounded-xl bg-[#ECECEC]"
                          placeholder="Username"
                          onChange={(e: any) => setUsername(e.target.value)}
                          required
                          readOnly={isCodeSent}
                        />

                        {isCodeSent && (
                          <>
                            <FormInput
                              type={InputTypes.Text}
                              name="code"
                              className="w-full px-5 py-3 rounded-xl bg-[#ECECEC]"
                              placeholder="Code"
                              onChange={(e: any) => setCode(e.target.value)}
                              required
                            />
                            <p className="mb-3 text-xs italic text-gray-600">
                              Code sent to your email
                            </p>

                            <FormInput
                              type={InputTypes.Password}
                              name="newPassword"
                              className="w-full px-5 py-3 mb-3 rounded-xl bg-slate-200"
                              placeholder="New Password"
                              onChange={(e: any) => setNewPassword(e.target.value)}
                              required
                            />
                          </>
                        )}

                        {!isCodeSent ? (
                          <Button
                            type={ButtonTypes.Submit}
                            isLoading={isLoading}
                            handleClick={handleResetPassword}
                          >
                            Reset Password
                          </Button>
                        ) : (
                          <Button
                            type={ButtonTypes.Submit}
                            isLoading={isLoading}
                            handleClick={handleSetNewPassword}
                          >
                            Set New Password
                          </Button>
                        )}
                      </Form>
                    </>
                  ) : (
                    <>
                      <h1 className="mb-2 text-3xl font-bold text-vision-dark-blue">
                        Successfully reset your password{' '}
                      </h1>
                    </>
                  )}

                  <span className="block mx-auto mb-3 text-center">
                    Go back to{' '}
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

export default ForgotPassword
