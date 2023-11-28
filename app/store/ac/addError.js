import addError from '../action/addError'
import setAuth from '../action/setAuth'
import eT from '../const/errorType'

export default (error) => {
  return async (dispatch) => {
    if (error.type === eT.API_ERR_INVALID_TOKEN) {
      dispatch(setAuth(null))
    }
    dispatch(addError(error))
  }
}
