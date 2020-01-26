import React, { useState, useEffect, useMemo } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import { decode } from 'jsonwebtoken'
import { client } from './index'
import Layout from './components/Layout'
import Auth from './Screens/Auth'
import Ballot from './Screens/Ballot'
import LeaderBoard from './Screens/LeaderBoard'
import ProtectedRoute from './components/ProtectedRoute'
import { User } from './graphql/shared-types'

const savedToken = localStorage.getItem('token')

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

  return (
    <Layout user={user} setToken={setToken}>
      <Router>
        <Switch>
          <ProtectedRoute path="/ballot" authenticated={tokenSaved}>
            <Ballot />
          </ProtectedRoute>
          <ProtectedRoute
            path="/admin"
            authenticated={!!(tokenSaved && user && user.admin)}
          >
            <Ballot />
          </ProtectedRoute>
          <ProtectedRoute path="/leaderboard" authenticated={tokenSaved}>
            <LeaderBoard />
          </ProtectedRoute>

          <Route path="/">
            {tokenSaved ? (
              <Redirect to="/ballot" />
            ) : (
              <Auth setToken={setToken} />
            )}
          </Route>
        </Switch>
      </Router>
    </Layout>
  )
}

export default App
