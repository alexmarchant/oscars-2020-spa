import React, { useState, useEffect, useMemo } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import Auth from './Auth'
import Header from './Header'
import Ballot from './Ballot'

import { decode } from 'jsonwebtoken'
import { client } from '../index'
import ProtectedRoute from './ProtectedRoute'

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
  const [tokenSaved, setTokenSaved] = useState(!!savedToken)

  // Recalc user when token changes
  const user = useMemo<User | undefined>(() => {
    if (!token) return
    return decode(token) as User
  }, [token])

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token)
      setTokenSaved(true)
      // history.push('/ballot')
    } else {
      localStorage.removeItem('token')
      setTokenSaved(false)
      // Need to reset after log out, cause if it caches the query
      // then logs in as a diff user, it retreives the other user's
      // data!
      client.resetStore()
    }
  }, [token])

  // if (tokenSaved && user) {
  //   return (
  //     <div>
  //       <Header email={user.email} name={user.name} setToken={setToken} />
  //       <Ballot />
  //     </div>
  //   )
  // } else {
  //   return <Auth setToken={setToken} />
  // }

  return (
    <Router>
      <Switch>
        <Route exact path="/login">
          {tokenSaved && <Redirect to="/ballot" />}
          <Auth setToken={setToken} />
        </Route>
        <Route path="/ballot">
          {!tokenSaved && <Redirect to="/login" />}
          <Ballot />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
