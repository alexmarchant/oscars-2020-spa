import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'

import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
  Operation,
  NextLink,
  concat,
} from '@apollo/client'

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

let apiBase
if (window.location.host.match('localhost')) {
  apiBase = 'http://localhost:4000'
} else {
  apiBase = 'https://oscars-api.alexmarchant.com'
}

const httpLink = new HttpLink({
  uri: apiBase,
})

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
)
