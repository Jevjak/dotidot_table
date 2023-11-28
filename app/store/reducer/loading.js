import aT from '../const/actionType'
import { initial } from '../initial'

export default (
  state = initial().loading,
  action
) => {
  switch (action.type) {
    case aT.ADD_LOADING:
      return [...state, action.data]
    case aT.FINISHED_LOADING:
      return state.filter((ld) => ld !== action.data)
    case aT.RESET_STORE:
      return initial().loading
    default:
      return state
  }
}
