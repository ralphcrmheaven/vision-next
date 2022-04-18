import React from 'react'
import { Link } from 'react-router-dom'

import Button from '../components/Button'
import Form from '../components/form/Form'
import FormInput, { InputTypes } from '../components/form/FormInput'
import Logo from '../components/Logo'

import cham3 from '../assets/images/cham3.png'

const Signup: React.FC = () => (
  <div className="mt-14">
    <div className="flex justify-center mb-10">
      <Logo />
    </div>

    <div className="bg-white mx-auto w-972 rounded-3xl px-9 pt-14 pb-36 text-center relative">
      <h1 className="text-vision-dark-blue font-bold text-3xl mb-2">
        Signup for an Account
      </h1>

      <span>Start your 14 day trial. No credit card account.</span>

      <Form className="mt-10 mb-8 w-455 mx-auto">
        <div className="columns-2 mb-3">
          <div>
            <FormInput
              name="firstname"
              className="rounded-xl bg-slate-200 py-3 px-5"
              placeholder="First Name"
            />
          </div>

          <div>
            <FormInput
              name="lastname"
              className="rounded-xl bg-slate-200 py-3 px-5"
              placeholder="Last Name"
            />
          </div>
        </div>

        <FormInput
          name="username"
          className="rounded-xl bg-slate-200 py-3 px-5 mb-3 w-full"
          placeholder="Username"
        />

        <FormInput
          name="email"
          className="rounded-xl bg-slate-200 py-3 px-5 mb-3 w-full"
          placeholder="Email Address"
        />

        <FormInput
          type={InputTypes.Password}
          name="username"
          className="rounded-xl bg-slate-200 py-3 px-5 mb-3 w-full"
          placeholder="Password"
        />

        <Button>Signup</Button>
      </Form>

      <span className="block mx-auto mb-3">
        Already have an account?{' '}
        <Link to={'/login'} className="text-vision-dark-blue font-bold">
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

export default Signup
