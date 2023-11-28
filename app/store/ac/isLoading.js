import addLoading from '../action/addLoading'
import finishedLoading from '../action/finishedLoading'

export default (what, isFinished = false) => {
  return async (dispatch) => {
    if (isFinished) {
      return dispatch(finishedLoading(what))
    }
    return dispatch(addLoading(what))
  }
}
