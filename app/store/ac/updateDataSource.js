import store from '../index.js'
import isLoading from './isLoading'
import addError from './addError'
import mutationDataSource from '../../requests/mutations/dataSource'

export default (data) => {
  return async (dispatch) => {
    const { auth } = store.getState()
    if (!auth) return
    dispatch(isLoading('update-data-source'))
    const { id, name, archived } = data
    const params = { }
    if (id) {
      params.id = id
    }
    if (name) {
      params.name = name
    }
    if (archived !== null) {
      params.archived = archived
    }
    const result = await mutationDataSource(params, auth)
    if (result && result.error) {
      dispatch(addError(result.error))
    }
    dispatch(isLoading('update-data-source', true))
    return result
  }
}
