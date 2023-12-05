import { useQuery } from '@apollo/client'

export const useFetch = (query, {
  variables = {},
  returnKey = undefined,
  defaultReturn = undefined,
  onError = () => null,
  onCompleted = (data) => null,
  skipInitial = false
}) => {
  const { loading, error, data, refetch, previousData } = useQuery(query, {
    variables: variables,
    onError: onError,
    onCompleted: onCompleted,
    skip: skipInitial
  })
  const newData = () => {
    const returnKeyPreviousData = returnKey && previousData ? previousData[returnKey] : previousData
    const returnKeyData = returnKey && data ? data[returnKey] : data
    const previousOrDefault = previousData ? returnKeyPreviousData : defaultReturn
    if (error) {
      return previousOrDefault
    }
    if (!data) {
      return previousOrDefault
    }
    return returnKeyData
  }

  return {
    data: newData(),
    error: error,
    loading,
    refetch
  }
}
