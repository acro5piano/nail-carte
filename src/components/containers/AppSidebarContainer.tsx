import { connect } from 'react-redux'
import { closeSidebar } from '../../actions'
import AppSidebar from '../AppSidebar'

const mapStateToProps = state => ({
  isOpened: state.sidebar.isOpened,
})

const mapDispatchToProps = dispatch => ({
  onCloseSidebar: () => dispatch(closeSidebar()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppSidebar)
