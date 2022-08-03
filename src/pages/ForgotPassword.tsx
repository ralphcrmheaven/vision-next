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
    <div className="mt-14">
      <div className="flex justify-center mb-10">
        <Logo />
      </div>

      <div className="relative mx-auto text-center bg-white w-972 rounded-3xl px-9 pt-14 pb-36">
        {isSuccessReset === false ? (
          <>
            <h1 className="mb-2 text-3xl font-bold text-vision-dark-blue">
              Forgot Password?
            </h1>

            <Form className="mx-auto mt-10 mb-8 w-455" onSubmit={() => false}>
              {error && (
                <Alert variation="error" className="mb-3 text-left">
                  {error}
                </Alert>
              )}

              <FormInput
                type={InputTypes.Text}
                name="username"
                className="w-full px-5 py-3 mb-3 rounded-xl bg-slate-200"
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
                    className="w-full px-5 py-3 rounded-xl bg-slate-200"
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

        <span className="block mx-auto mb-3">
          Go back to{' '}
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

export default ForgotPassword