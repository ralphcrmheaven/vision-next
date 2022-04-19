import React, { ChangeEventHandler } from 'react'

export enum InputTypes {
  Text = 'text',
  Password = 'password',
}

interface Props {
  type?: InputTypes
  name: string
  className?: string
  placeholder?: string
  error?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
}

const FormInput: React.FC<Props> = ({
  type = InputTypes.Text,
  name,
  className = '',
  placeholder = '',
  error = '',
  onChange = () => {},
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
      />
    </>
  )
}

export default FormInput
