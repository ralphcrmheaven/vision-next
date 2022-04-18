import React, { FormEvent } from 'react'

interface Props {
  className?: string
  onSubmit?: (e: FormEvent) => void
  children: React.ReactNode
}

const Form: React.FC<Props> = ({
  className = '',
  onSubmit = () => {},
  children,
}) => (
  <form className={className} onSubmit={onSubmit}>
    {children}
  </form>
)

export default Form
