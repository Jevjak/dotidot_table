import 'core-js/stable'
import 'regenerator-runtime/runtime'
import React from 'react'
import { ApolloProvider } from '@apollo/client'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import './index.scss'
import store from './store/index.js'
import App from './myapp'
import { client } from './util/apollo'

const container = document.getElementById('app-root')
const root = createRoot(container)
root.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Provider>
)
