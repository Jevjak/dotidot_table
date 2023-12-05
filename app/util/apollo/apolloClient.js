import { ApolloClient, InMemoryCache, from, HttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { RetryLink } from '@apollo/client/link/retry'
import { auth } from '../../config'

const httpLink = new HttpLink({ uri: '/api' })

const retryLink = new RetryLink({
  delay: {
    initial: 1000,
    max: 30000,
    jitter: false
  },
  attempts: {
    max: 2,
    retryIf (error, _operation) {
      const consoleReport = 'Request failure detected. Details below.\n' +
        '-- operation name:' + _operation?.operationName + '\n' +
        '-- variables:\n' +
        JSON.stringify(_operation?.variables, null, 2) + '\n' +
        '-- query:\n' +
        _operation?.query?.loc?.source?.body + '\n' +
        '-- error:\n' +
        JSON.stringify(error, null, 2)
      console.log(consoleReport)

      return !!error
    }
  }
})

const authLink = setContext(({ headers }) => {
  return {
    uri: '/api',
    headers: {
      ...headers,
      authorization: auth ? `ApiToken ${auth}` : ''
    }
  }
})

export const client = new ApolloClient({
  cache: new InMemoryCache({
    addTypename: false
  }),
  link: from([
    retryLink,
    authLink,
    httpLink
  ]),
  defaultOptions: {
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all'
    },
    mutate: {
      errorPolicy: 'all'
    }
  },
  connectToDevTools: true
})
