interface Props {
  children?: React.ReactNode
  isSubmit?: boolean
  className?: string
}

const Button: React.FC<Props> = ({
  children,
  isSubmit = false,
  className = '',
}) => (
  <button type={isSubmit ? 'submit' : 'button'} className={className}>
    {children}
  </button>
)
export default Button
