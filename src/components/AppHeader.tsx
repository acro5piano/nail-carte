import * as React from 'react'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { withStyles } from 'material-ui/styles'
import { OpenSidebarUseCase } from '../use-case/ToggleAppSidebarUseCase'
import { appContextLocator } from '../AppContextLocator'

interface AppHeaderProps {}

const openSidebar = () => appContextLocator.context.useCase(new OpenSidebarUseCase()).execute()

const AppHeader = ({ classes }) => (
  <AppBar>
    <Toolbar>
      <IconButton onClick={openSidebar} className={classes.menuButton} color="inherit" aria-label="Menu">
        <MenuIcon />
      </IconButton>
      <Typography variant="title" color="inherit" noWrap>
        Customers
      </Typography>
    </Toolbar>
  </AppBar>
)

const styles = {
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
}

export default withStyles(styles)<AppHeaderProps>(AppHeader)
