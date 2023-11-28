import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import loadDataSource from './store/ac/loadDataSource'
import updateDataSource from './store/ac/updateDataSource'

const mapStateToProps = ({
  auth,
  loading
}) => {
  return {
    auth,
    loading: loading.includes('load-data-source')
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    loadDataSource,
    updateDataSource
  }, dispatch)
}

export default (component) => {
  return connect(mapStateToProps, mapDispatchToProps)(component)
}
