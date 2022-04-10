import ReactDOM from 'react-dom'
import { ThemeProvider } from 'styled-components'
import { lightTheme } from 'amazon-chime-sdk-component-library-react'

import { Amplify } from 'aws-amplify'
import awsconfig from './aws-exports'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import './index.css'

Amplify.configure(awsconfig)

window.addEventListener('load', () => {
  ReactDOM.render(
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>,
    document.getElementById('root')
  )
})
