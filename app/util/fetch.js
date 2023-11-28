import { gql } from '@apollo/client'
import { client } from './apollo/apolloClient'

export default async ({ query, variables = null }) => {
  const isGqlString = typeof query === 'string'
  const isMutation = isGqlString && query.trim().substring(0, 8).toLowerCase() === 'mutation'
  const gqlOperationType = !isGqlString && query.definitions[0].operation

  let result = null

  if (isMutation || gqlOperationType === 'mutation') {
    const resMutation = await client.mutate({
      mutation: isGqlString ? gql`${query}` : query,
      variables
    })
    if (resMutation) result = resMutation
  } else {
    const resQuery = await client.query({
      query: isGqlString ? gql`${query}` : query,
      variables
    })
    if (resQuery) result = resQuery
  }

  if (result?.errors?.length) {
    console.log('API request returned some errors:')
    console.log(JSON.stringify({ errors: result.errors, variables, query }, null, 2))
  }

  return ({ ...result, errors: result.errors })
}
