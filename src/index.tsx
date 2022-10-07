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

import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

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



// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://cra.link/PWA
// serviceWorkerRegistration.register();

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
