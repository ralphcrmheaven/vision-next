import ReactDOM from 'react-dom'
import { ThemeProvider } from 'styled-components'
import { lightTheme } from 'amazon-chime-sdk-component-library-react'

import { Amplify } from 'aws-amplify'
import awsconfig from './aws-exports'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import store from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import persistStore from 'redux-persist/es/persistStore'

Amplify.configure(awsconfig)

const persistor = persistStore(store)

window.addEventListener('load', () => {
  ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={lightTheme}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </PersistGate>
    </Provider>,
    document.getElementById('root')
  )
})
