import eT from '../store/const/errorType'

function defaultError (request, message, code) {
  return {
    error: {
      type: eT.ERR_UNKNOWN,
      request,
      message,
      code
    }
  }
}

function apiError (request, errors) {
  if (errors) return { errors }
  return defaultError(
    request,
    (errors && errors.length > 0 && errors[0].message) ? errors[0].message : '',
    (errors && errors.length > 0 && errors[0].extensions) ? errors[0].extensions.code : null
  )
}

function noResponse () {
  return {
    error: {
      type: eT.API_ERR_NO_RESPONSE
    }
  }
}

export default {
  defaultError,
  apiError,
  noResponse
}
