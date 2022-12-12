import React, { ChangeEventHandler } from 'react'

export enum InputTypes {
  Text = 'text',
  Password = 'password',
  Email = 'email',
  Checkbox = 'checkbox'
}

interface Props {
  type?: InputTypes
  name: string
  id?: string
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
  id = '',
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
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        readOnly={readOnly}
      />
      { type == InputTypes.Checkbox &&
        <label htmlFor={id}>{placeholder}</label>
      }
      
    </>
  )
}

export default FormInput
