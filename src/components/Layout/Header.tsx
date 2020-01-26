import React, { Dispatch, SetStateAction } from 'react'
import { User } from '../../graphql/shared-types'
interface Props {
  user: User | undefined
  setToken: Dispatch<SetStateAction<string | null | undefined>>
}

const Header: React.FC<Props> = ({ user, setToken }) => {
  return user ? (
    <div>
      email: {user.email}
      &nbsp; name: {user.name}
      &nbsp;
      <button onClick={() => setToken(null)}>Log Out</button>
      <hr />
    </div>
  ) : null
}

export default Header
