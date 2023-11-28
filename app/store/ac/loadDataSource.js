import { client } from '../../util'
import setAuth from '../action/setAuth'
import isLoading from './isLoading'
import addError from './addError'
import queryDataSource from '../../requests/queries/dataSource'
import { auth } from '../const/config'

export default () => {
  return async (dispatch) => {
    dispatch(isLoading('load-data-source'))
    await dispatch(setAuth(auth))
    await client.resetStore()
    const result = await queryDataSource()
    if (result.error) {
      dispatch(addError(result.error))
    }
    dispatch(isLoading('load-data-source', true))
    return result.collection.dataSources
  }
}
