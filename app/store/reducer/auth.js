import aT from '../const/actionType'
import { initial } from '../initial'

export default (state = initial().auth, action) => {
  switch (action.type) {
    case aT.SET_AUTH:
      return action.data
    case aT.RESET_STORE:
      return initial().auth
    default:
      return state
  }
}
