import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

// настройки плагина
import './i18n'
import LoaderPage from './components/Loader/LoaderPage'

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<LoaderPage text="Loading..."/>/*<div className="h-screen w-screen flex items-center justify-center">Loading...</div>*/}>
      <App />
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
)

reportWebVitals()
