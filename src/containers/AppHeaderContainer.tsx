import { connect } from 'react-redux'
import { openSidebar } from '../actions'
import AppHeader from '../components/AppHeader'

const mapStateToProps = state => ({
  isOpened: state.isOpened,
})

const mapDispatchToProps = dispatch => ({
  onClickMenu: () => dispatch(openSidebar()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppHeader)
