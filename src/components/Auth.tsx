import React, { useState } from 'react'

enum Mode {
  Login,
  Signup,
}

const Auth: React.FC = () => {
  const [mode, setMode] = useState(Mode.Signup)

  return (
    <div>
      <form>
        {mode === Mode.Signup && (
          <>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" />
            <br></br>
          </>
        )}
        <label htmlFor="email">Email:</label>
        <input type="text" id="email" />
        <br></br>
        <label htmlFor="name">Password:</label>
        <input type="text" id="password" />
        <br></br>
        <input type="submit" value="Submit" />
      </form>
      {mode === Mode.Login && (
        <button onClick={() => setMode(Mode.Signup)}>Sign Up</button>
      )}
      {mode === Mode.Signup && (
        <button onClick={() => setMode(Mode.Login)}>Log In</button>
      )}
    </div>
  )
}

export default Auth
