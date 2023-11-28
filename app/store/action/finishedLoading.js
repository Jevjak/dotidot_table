import aT from '../const/actionType'

export default (data) => {
  return { type: aT.FINISHED_LOADING, data }
}
