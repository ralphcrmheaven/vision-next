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
}

const FormInput: React.FC<Props> = ({
  type = InputTypes.Text,
  name,
  className = '',
  placeholder = '',
}) => (
  <input
    type={type}
    name={name}
    className={className}
    placeholder={placeholder}
  />
)

export default FormInput
