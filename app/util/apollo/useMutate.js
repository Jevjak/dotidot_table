import { useMutation } from '@apollo/client'

export const useMutate = (query, {
  variables,
  onError = () => null,
  onCompleted = () => null
}) => {
  const [mutation, { data, error, loading }] = useMutation(query, {
    variables,
    onError,
    onCompleted
  })

  return {
    mutation,
    data,
    error,
    loading
  }
}
