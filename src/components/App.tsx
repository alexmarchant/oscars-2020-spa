import React, { useState, useEffect, useMemo } from 'react'
import Auth from './Auth'
import Ballot from './Ballot'
import { decode } from 'jsonwebtoken'

const savedToken = localStorage.getItem('token')

interface User {
  id: number
  name: string
  email: string
  createdAt: string
  updatedAt: string
}

const App: React.FC = () => {
  const [token, setToken] = useState<string | null | undefined>(savedToken)
  const [tokenSaved, setTokenSaved] = useState(false)

  // Recalc user when token changes
  const user = useMemo<User | undefined>(() => {
    if (!token) return
    return decode(token) as User
  }, [token])

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token)
      setTokenSaved(true)
    } else {
      localStorage.removeItem('token')
      setTokenSaved(false)
    }
  }, [token])

  if (tokenSaved && user) {
    return (
      <div>
        <div>
          email: {user.email}
          &nbsp; name: {user.name}
          &nbsp;
          <button onClick={() => setToken(null)}>Log Out</button>
        </div>
        <hr></hr>
        <Ballot />
      </div>
    )
  } else {
    return <Auth setToken={setToken} />
  }
}

export default App
