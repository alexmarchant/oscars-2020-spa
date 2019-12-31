import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import styled from 'styled-components'
import gql from 'graphql-tag'

const Code = styled.pre`
  border: 1px solid #bbb;
  background-color: #eee;
  padding: 10px;
  border-radius: 3px;
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

const incrementMutationString = `mutation Increment {
  incrementCounter
}`
const INCREMENT_COUNTER = gql`
  mutation Increment {
    incrementCounter
  }
`

const App: React.FC = () => {
  const { data, loading, error } = useQuery(GET_EVERYTHING)
  const [ incrementCounter, incrementCounterResult ] = useMutation(INCREMENT_COUNTER)
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
      <Code>{incrementMutationString}</Code>
      <strong>Trigger Mutation:</strong>
      <br></br>
      <br></br>
      <button onClick={(): void => { incrementCounter() }}>Increment</button>
      <br></br>
      <br></br>
      <strong>Result</strong>
      <Code>{incrementCounterResult?.data?.incrementCounter ?? data.counter}</Code>
    </div>
  )
}

export default App
