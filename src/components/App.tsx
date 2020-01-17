import React, { useState, useEffect } from 'react'
import Auth from './Auth'
import Ballot from './Ballot'

const savedToken = localStorage.getItem('token')

const App: React.FC = () => {
  const [token, setToken] = useState<string | null | undefined>(savedToken)

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token)
    } else {
      localStorage.removeItem('token')
    }
  }, [token])

  if (token) {
    return <Ballot />
  } else {
    return <Auth setToken={setToken} />
  }
}

export default App
