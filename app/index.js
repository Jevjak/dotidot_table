import 'core-js/stable'
import 'regenerator-runtime/runtime'
import React from 'react'
import { ApolloProvider } from '@apollo/client'

import './index.scss'
import App from './myapp'
import { client } from './util'

import ReactDOM from 'react-dom/client'

const root = ReactDOM.createRoot(document.getElementById('app-root'))
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)
