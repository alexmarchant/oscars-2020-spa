import React from 'react'
import styled from 'styled-components'
import { useQuery, gql } from '@apollo/client'

const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const GET_USERS = gql`
  {
    users {
      name
    }
  }
`

interface GetUsersResponse {
  users: {
    name: string
  }
}

const App: React.FC = () => {
  const { loading, error, data } = useQuery<GetUsersResponse>(GET_USERS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <Container>
      <h1>Oscars 2020 SPA</h1>
      {data && <pre>{JSON.stringify(data.users, null, 2)}</pre>}
    </Container>
  )
}

export default App
