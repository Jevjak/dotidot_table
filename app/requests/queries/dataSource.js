import fetchRequest from '../../util/fetch'
import errUtil from '../../util/error'

const query = `query DataSources {
  collection(
    page: 0,
    limit: 100,
    identifier: "organization"
    organizationId: 19952
  ){
    dataSources {
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

async function queryDataSource (token) {
  const response = await fetchRequest({ query, token })
  if (!response) return errUtil.noResponse()

  const { errors, data } = response
  if (errors) {
    return errUtil.apiError('dataSource', errors)
  }
  return data
}

export default queryDataSource
