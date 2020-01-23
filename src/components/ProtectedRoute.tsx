import React, { ReactNode } from 'react'
import { Route, Redirect } from 'react-router-dom'

interface Props {
  children: ReactNode
  authenticated: boolean
  path: string
}

function ProtectedRoute({ children, authenticated, ...rest }: Props) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        authenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}

export default ProtectedRoute
