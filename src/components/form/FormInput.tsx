import React from 'react'

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
}

const FormInput: React.FC<Props> = ({
  type = InputTypes.Text,
  name,
  className = '',
  placeholder = '',
  error = '',
  ...props
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
        {...props}
      />

      {error && <span>{error}</span>}
    </>
  )
}

export default FormInput
