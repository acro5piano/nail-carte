import * as React from 'react'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { withStyles } from 'material-ui/styles'

const styles = {
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
}

interface AppHeaderProps {
  onClickMenu: () => void
}

const AppHeader = ({ classes, onClickMenu }) => (
  <AppBar>
    <Toolbar>
      <IconButton onClick={onClickMenu} className={classes.menuButton} color="inherit" aria-label="Menu">
        <MenuIcon />
      </IconButton>
      <Typography variant="title" color="inherit" noWrap>
        Customers
      </Typography>
    </Toolbar>
  </AppBar>
)

export default withStyles(styles)<AppHeaderProps>(AppHeader)
