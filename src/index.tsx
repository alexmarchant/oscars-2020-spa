import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
  Operation,
  NextLink,
  concat,
  split,
} from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/link-ws'
import './scss/index.scss'

// import './index.css'

const authMiddleware = new ApolloLink(
  (operation: Operation, forward: NextLink) => {
    operation.setContext(() => {
      // add the authorization to the headers
      const headers: any = {}
      const token = localStorage.getItem('token')
      if (token) {
        headers['Authorization'] = `Bearer ${token}`
      }

      return {
        headers,
      }
    })

    return forward(operation)
  },
)

let host
let httpProtocol
let wsProtocol
if (window.location.host.match('localhost')) {
  host = 'localhost:4000'
  httpProtocol = 'http://'
  wsProtocol = 'ws://'
} else {
  host = 'oscars-api.alexmarchant.com'
  httpProtocol = 'http://'
  wsProtocol = 'ws://'
}

const httpLink = new HttpLink({
  uri: httpProtocol + host,
})

const wsLink = new WebSocketLink({
  uri: wsProtocol + host + '/graphql',
  options: {
    reconnect: true,
  },
})

const authedHttpLink = concat(authMiddleware, httpLink)

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  authedHttpLink,
)

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
)
