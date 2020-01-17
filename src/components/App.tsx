import React from 'react'
import Auth from './Auth'
import Ballot from './Ballot'

const loggedIn = false

const App: React.FC = () => {
  if (!loggedIn) {
    return <Auth />
  } else {
    return <Ballot />
  }
}

export default App
