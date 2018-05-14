import * as React from 'react'
import FloatingActionButton from './material-ui/Button/FloatingActionButton'
import { withStyles } from 'material-ui/styles'
// import { OpenSidebarUseCase } from '../use-case/ToggleAppSidebarUseCase'
// import { appContextLocator } from '../AppContextLocator'

interface AppBodyProps {}

const notify = () => alert('hello')

const AppBody = ({ classes }) => (
  <div className="AppBody">
    <FloatingActionButton onClick={notify} />
  </div>
)

const styles = {
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
}

export default withStyles(styles)<AppBodyProps>(AppBody)
