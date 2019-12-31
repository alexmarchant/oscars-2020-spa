import { ApolloProvider } from '@apollo/react-hooks'
import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import App from './App'
import './index.css'

let apiBase
if (location.host.match('localhost')) {
  apiBase = 'http://localhost:3001/'
} else {
  apiBase = 'http://oscars.alexmarchant.com/'
}

const cache = new InMemoryCache()
const link = new HttpLink({ uri: apiBase })
const client = new ApolloClient({
  cache,
  link,
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
