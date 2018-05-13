import * as React from 'react'
import Button from 'material-ui/Button'
import AddIcon from '@material-ui/icons/Add'
import { withStyles } from 'material-ui/styles'
// import { OpenSidebarUseCase } from '../use-case/ToggleAppSidebarUseCase'
// import { appContextLocator } from '../AppContextLocator'

interface AppBodyProps {}

const notify = () => alert('hello')

const AppBody = ({ classes }) => (
  <div className="AppBody">
    <Button onClick={notify} variant="fab" color="primary">
      <AddIcon />
    </Button>
  </div>
)

const styles = {
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
}

export default withStyles(styles)<AppBodyProps>(AppBody)
