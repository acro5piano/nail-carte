import { connect } from 'react-redux'
import { closeSidebar } from 'sarte/actions'
import AppSidebar from 'sarte/components/AppSidebar'

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
