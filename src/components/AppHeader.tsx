import * as React from 'react'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { withStyles } from 'material-ui/styles'

interface AppHeaderProps {
  title: string
  onClickMenu?: () => void
  hasBack?: boolean
  history?: any
}

const AppHeader = ({ classes, onClickMenu, hasBack = false, history, title }) => (
  <AppBar>
    <Toolbar>
      <IconButton onClick={onClickMenu ? onClickMenu : history.goBack} className={classes.menuButton} color="inherit" aria-label="Menu">
        {hasBack ? <ArrowBackIcon /> : <MenuIcon />}
      </IconButton>
      <Typography variant="title" color="inherit" noWrap>
        {title}
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
