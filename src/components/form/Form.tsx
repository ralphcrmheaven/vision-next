import React from 'react'

interface Props {
  className?: string
  children: React.ReactNode
}

const Form: React.FC<Props> = ({ className = '', children }) => (
  <form className={className}>{children}</form>
)

export default Form
