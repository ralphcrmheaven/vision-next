import React, { ChangeEventHandler } from 'react'

export enum InputTypes {
  Text = 'text',
  Password = 'password',
  Email = 'email',
}

interface Props {
  type?: InputTypes
  name: string
  className?: string
  placeholder?: string
  error?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  required?: boolean
  readOnly?: boolean
}

const FormInput: React.FC<Props> = ({
  type = InputTypes.Text,
  name,
  className = '',
  placeholder = '',
  error = '',
  onChange = () => {},
  required = false,
  readOnly = false,
}) => {
  if (error !== '') {
    className +=
      ' border border-red-400 focus-visible:outline-red-400 placeholder:text-red-400'
  }

  return (
    <>
      <input
        type={type}
        name={name}
        className={className}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        readOnly={readOnly}
      />
    </>
  )
}

export default FormInput
