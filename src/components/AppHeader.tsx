import * as React from 'react'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'

interface AppHeaderProps {
  title?: string
  onClickMenu?: () => void
  hasBack?: boolean
  onSubmit?: () => void
  submitTitle?: string
}

const back = () => history.back()

const AppHeader = ({ classes, onClickMenu, hasBack = false, title = '', onSubmit, submitTitle }) => (
  <AppBar>
    <Toolbar>
      <IconButton onClick={onClickMenu ? onClickMenu : back} className={classes.menuButton} color="inherit" aria-label="Menu">
        {hasBack ? <ArrowBackIcon /> : <MenuIcon />}
      </IconButton>
      <Typography variant="title" color="inherit" noWrap className={classes.flex}>
        {title}
      </Typography>
      {onSubmit && <Button onClick={onSubmit} color="inherit">{submitTitle}</Button>}
    </Toolbar>
  </AppBar>
)

const styles = {
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
}

export default withStyles(styles)<AppHeaderProps>(AppHeader)
