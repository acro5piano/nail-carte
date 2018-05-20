import { connect } from 'react-redux'
import { openSidebar } from 'sarte/actions'
import AppHeader from 'sarte/components/AppHeader'

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
