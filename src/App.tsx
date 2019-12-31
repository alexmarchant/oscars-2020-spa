import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import styled from 'styled-components'
import gql from 'graphql-tag'

const Code = styled.pre`
  border: 1px solid #333;
  background-color: #ddd;
  padding: 10px;
`

const getEverythingQueryString = `query GetEverything {
  testPayload {
    string
    int
    float
    bool
  }
  counter
}`
const GET_EVERYTHING = gql`
  query GetEverything {
    testPayload {
      string
      int
      float
      bool
    }
    counter
  }
`

const App: React.FC = () => {
  const { data, loading, error } = useQuery(GET_EVERYTHING)
  if (loading) return <p>LOADING</p>
  if (error) return <p>ERROR</p>

  const dataString = JSON.stringify(data, null, 2)

  return (
    <div>
      <strong>Query:</strong>
      <Code>{getEverythingQueryString}</Code>
      <strong>Result:</strong>
      <Code>{dataString}</Code>
      <hr></hr>
      <strong>Mutation:</strong>
      <Code></Code>
      <strong>Trigger Mutation:</strong>
      <br></br>
      <br></br>
      <button>Increment</button>
      <br></br>
      <br></br>
      <strong>Result</strong>
      <Code>{data.counter}</Code>
    </div>
  )
}

export default App
