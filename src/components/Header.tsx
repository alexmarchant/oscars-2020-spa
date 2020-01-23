import React, { Dispatch, SetStateAction } from 'react'
interface Props {
  email: string
  name: string
  setToken: Dispatch<SetStateAction<string | null | undefined>>
}

const Header: React.FC<Props> = ({ email, name, setToken }) => {
  return (
    <div>
      email: {email}
      &nbsp; name: {name}
      &nbsp;
      <button onClick={() => setToken(null)}>Log Out</button>
      <hr />
    </div>
  )
}

export default Header
