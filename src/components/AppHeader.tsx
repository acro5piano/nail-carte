import * as React from 'react'
import { compose } from 'recompose'
import { inject, observer } from 'mobx-react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

interface AppHeaderProps {
  title?: string
  hasBack?: boolean
  canSubmit?: boolean
  onSubmit?: () => void
  submitTitle?: string
}

const back = () => history.back()

const AppHeader = ({ classes, canSubmit = true, hasBack = false, title = '', onSubmit, submitTitle, uiStore }) => (
  <AppBar>
    <Toolbar>
      <IconButton onClick={hasBack ? back : uiStore.toggleSidebar} className={classes.menuButton} color="inherit" aria-label="Menu">
        {hasBack ? <ArrowBackIcon /> : <MenuIcon />}
      </IconButton>
      <Typography variant="title" color="inherit" noWrap className={classes.flex}>
        {title}
      </Typography>
      {onSubmit && <Button disabled={!canSubmit} onClick={onSubmit} color="inherit">{submitTitle}</Button>}
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

export default compose(
  inject('uiStore'),
  observer,
  withStyles(styles),
)<AppHeaderProps>(AppHeader)
