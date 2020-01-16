import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client";

let apiBase;
if (window.location.host.match("localhost")) {
  apiBase = "http://localhost:4000";
} else {
  apiBase = "https://oscars-api.alexmarchant.com";
}

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: apiBase
  })
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
