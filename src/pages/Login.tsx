import { Link } from 'react-router-dom'

import Logo from '../components/Logo'
import Form from '../components/form/Form'
import FormInput, { InputTypes } from '../components/form/FormInput'
import Button from '../components/Button'

import cham3 from '../assets/images/cham3.png'

const Login = () => (
  <div className="mt-14">
    <div className="flex justify-center mb-10">
      <Logo />
    </div>

    <div className="bg-white mx-auto w-972 rounded-3xl px-9 pt-14 pb-36 text-center relative">
      <h1 className="text-vision-dark-blue font-bold text-3xl mb-2">
        Login to your account
      </h1>

      <span>See the world right in front of you</span>

      <Form className="mt-10 mb-8">
        <FormInput
          name="username"
          className="rounded-xl bg-slate-200 py-3 px-5 w-455 mb-3"
          placeholder="Username"
        />

        <FormInput
          type={InputTypes.Password}
          name="username"
          className="rounded-xl bg-slate-200 py-3 px-5 w-455 mb-3"
          placeholder="Password"
        />

        <Button className="rounded-xl block py-3 px-5 bg-vision-dark-blue w-455 mx-auto text-white font-semibold">
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
)

export default Login
