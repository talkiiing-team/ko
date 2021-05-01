import React from 'react'
import { Provider } from 'react-redux'
import store from './store'
import Routes from './routes'
import { Footer } from './components/Footer'

const App = () => {
  return (
    <>
      <Provider store={store}>
        <Routes />
      </Provider>
      <Footer />
    </>
  )
}

export default App
