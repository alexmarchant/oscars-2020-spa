import React from 'react'
import Header from './Header'
import { User } from '../../graphql/shared-types'

interface Props {
  children: any
  user: User | undefined
  setToken: any
  tokenSaved: boolean
}

const Layout: React.FC<Props> = ({ children, user, setToken, tokenSaved }) => {
  return (
    <div className="h-100">
      {tokenSaved && user && <Header user={user} setToken={setToken} />}
      <div style={{ marginTop: '200px' }}>{children}</div>
    </div>
  )
}

export default Layout
