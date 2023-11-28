import fetchRequest from '../../util/fetch'
import errUtil from '../../util/error'

const query = `mutation updateDataSource(
    $id: BigInt!,
    $name: String!,
    $archived: Boolean!
  ) {
    updateDataSource (
      id: $id
      name: $name
      archived: $archived
    ){
      dataSource{
        id
        name
        archived
        createdAt
        archived
        icon
        itemsCount
        lastImport
      }
    }
  }`

async function mutationDataSource (variables, token) {
  const response = await fetchRequest({
    variables,
    query,
    token
  })
  if (!response) return errUtil.noResponse()

  const { errors, data } = response
  if (errors) {
    return errUtil.apiError('dataSourceMutation', errors)
  }
  return data.updateDataSource.dataSource
}

export default mutationDataSource
