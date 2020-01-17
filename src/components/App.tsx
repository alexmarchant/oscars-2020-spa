import React, { useState } from 'react'
import Auth from './Auth'
import Ballot from './Ballot'

const App: React.FC = () => {
  const [token, setToken] = useState<string | null | undefined>()

  if (token) {
    return <Ballot />
  } else {
    return <Auth setToken={setToken} />
  }
}

export default App
