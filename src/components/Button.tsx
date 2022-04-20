export enum ButtonTypes {
  Button = 'button',
  Submit = 'submit',
}
interface Props {
  children?: React.ReactNode
  type?: ButtonTypes
  isLoading?: boolean
  loadingText?: string
}

const Button: React.FC<Props> = ({
  children,
  type = ButtonTypes.Button,
  isLoading = false,
  loadingText = 'Processing',
}) => {
  let className =
    'block px-5 py-3 mx-auto font-semibold text-white rounded-xl w-455'
  className += isLoading ? 'bg-slate-500' : 'bg-vision-dark-blue'

  if (isLoading) {
    className += ' bg-slate-500 inline-flex items-center justify-center'
  } else {
    className += ' bg-vision-dark-blue'
  }

  return (
    <button type={type} className={className} disabled={isLoading}>
      {isLoading ? (
        <>
          <svg
            className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          {loadingText}
        </>
      ) : (
        children
      )}
    </button>
  )
}

export default Button

/* <button
          type="button"
          className="inline-flex items-center px-4 py-2 text-sm font-semibold leading-6 text-white transition duration-150 ease-in-out bg-indigo-500 rounded-md shadow cursor-not-allowed hover:bg-indigo-400"
          disabled
        >
          <svg
            className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Processing...
        </button> */
