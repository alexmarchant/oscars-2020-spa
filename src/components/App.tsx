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

  // Recalc user when token changes
  const user = useMemo<User | undefined>(() => {
    if (!token) return
    return decode(token) as User
  }, [token])

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token)
    } else {
      localStorage.removeItem('token')
    }
  }, [token])

  if (token) {
    return (
      <div>
        <div>user: {JSON.stringify(user)}</div>
        <Ballot />
        <button onClick={() => setToken(null)}>Log Out</button>
      </div>
    )
  } else {
    return <Auth setToken={setToken} />
  }
}

export default App
