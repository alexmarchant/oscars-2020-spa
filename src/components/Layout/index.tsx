import React from 'react'
import Header from './Header'
import { User } from '../../graphql/shared-types'

interface Props {
  children: any
  user: User | undefined
  setToken: any
}

const Layout: React.FC<Props> = ({ children, user, setToken }) => {
  return (
    <div className="h-100">
      {user && <Header user={user} setToken={setToken} />}
      <div style={{ marginTop: '200px' }}>{children}</div>
    </div>
  )
}

export default Layout
