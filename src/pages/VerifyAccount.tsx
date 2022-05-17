import { FormEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, confirmSignup } from '../redux/features/userSlice'
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom'

import Form from '../components/form/Form'
import FormInput from '../components/form/FormInput'
import Button, { ButtonTypes } from '../components/Button'

import Logo from '../components/Logo'
import cham3 from '../assets/images/cham3.png'
import { Alert } from '@aws-amplify/ui-react'

const VerifyAccount = () => {
  const dispatch = useDispatch()
  const { username } = useSelector(selectUser)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const [code, setCode] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [isVerified, setIsVerified] = useState<boolean>(false)

  if (username) {
    return <Navigate to={'/'} replace />
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    setIsLoading(true)
    setError('')

    const data = {
      username: searchParams.get('username'),
      code,
    }

    const { error } = await dispatch(confirmSignup(data))

    if (error) {
      setError(error.message)
      setIsLoading(false)
    } else {
      setIsVerified(true)
    }
  }

  const handleClick = () => {
    navigate('/login')
  }

  return (
    <>
      <div className="mt-14">
        <div className="flex justify-center mb-10">
          <Logo />
        </div>

        <div className="relative mx-auto text-center bg-white w-972 rounded-3xl px-9 pt-14 pb-36">
          {isVerified ? (
            <>
              <h1 className="mb-2 text-3xl font-bold text-vision-dark-blue">
                Thank you!
              </h1>

              <span className="inline-block mb-10 w-360">
                We have verified your account. Please click button below to go
                back to Login.
              </span>

              <Button
                type={ButtonTypes.Submit}
                className="w-455"
                handleClick={handleClick}
              >
                Login
              </Button>
            </>
          ) : (
            <>
              <h1 className="mb-2 text-3xl font-bold text-vision-dark-blue">
                Verify your account
              </h1>

              <span>Please enter the code that we sent to your email.</span>

              <Form className="mt-10 mb-8" onSubmit={handleSubmit}>
                {error && (
                  <div className="inline-block mb-3 text-left w-455">
                    <Alert
                      variation="error"
                      className="mx-auto mb-3 text-left w-455"
                    >
                      {error}
                    </Alert>
                  </div>
                )}

                <FormInput
                  name="code"
                  className="px-5 py-3 mb-3 text-center rounded-xl bg-slate-200 w-455"
                  placeholder="Code"
                  onChange={(e: any) => setCode(e.target.value)}
                  required
                />

                <Button
                  type={ButtonTypes.Submit}
                  isLoading={isLoading}
                  className="w-455"
                >
                  Verify Account
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
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default VerifyAccount
