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
import '../assets/styles/auth.css';

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
      <div className="auth-page">
        {/* <div className="auth-page__bg"></div> */}
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
                  <h1 className="mb-2 auth-page__title font-bold text-vision-dark-blue text-[22px] sm:text-[30px]">
                    Login to your account
                  </h1>

                  <span className="text-[#747474] auth-page__title-sub whitespace-pre sm:whitespace-normal">See the world right in front of you</span>

                  <Form className="login-mobile-view-form w-full sm:w-full md:w-400 lg:w-455" onSubmit={handleSubmit}>
                    {error && (
                      <Alert variation="error" className="mx-auto mb-3 text-left w-full sm:w-full md:w-400 lg:w-455">
                        {error}
                      </Alert>
                    )}

                    <FormInput
                      name="username"
                      className="px-5 py-3 mx-auto  rounded-xl bg-[#ECECEC] sm:md:w-[400px] md:w-[400px] lg:w-455 w-full placeholder-black"
                      placeholder="Username"
                      onChange={(e: any) => setUsername(e.target.value)}
                      required
                    />

                    <FormInput
                      type={InputTypes.Password}
                      name="password"
                      className="px-5 py-3 mx-auto rounded-xl bg-[#ECECEC] sm:md:w-[400px] md:w-[400px] lg:w-455 w-full placeholder-black"
                      placeholder="Password"
                      onChange={(e: any) => setPassword(e.target.value)}
                      required
                    />

                    <Button className='sm:md:w-[400px] md:w-[400px] lg:w-455 w-full' type={ButtonTypes.Submit} isLoading={isLoading}>
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
    </>
  )
}
export default Login
