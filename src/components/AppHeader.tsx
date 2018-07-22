import * as React from 'react'
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'
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
  backto?: string
  canSubmit?: boolean
  noMenu?: boolean
  onSubmit?: () => void
  submitTitle?: string
  history: any
}

const AppHeader = ({
  classes,
  history,
  noMenu = false,
  canSubmit = true,
  hasBack = false,
  backTo = '',
  title = '',
  onSubmit,
  submitTitle,
  uiStore,
}) => {
  const onClickLeft = () => {
    if (hasBack) {
      if (backTo) {
        history.push(backTo)
      } else {
        history.goBack()
      }
      return
    }
    uiStore.toggleSidebar()
  }

  return (
    <AppBar>
      <Toolbar>
        {!noMenu && (
          <IconButton onClick={onClickLeft} className={classes.menuButton} color="inherit" aria-label="Menu">
            {hasBack ? <ArrowBackIcon /> : <MenuIcon />}
          </IconButton>
        )}
        <Typography variant="title" color="inherit" noWrap className={classes.title}>
          {title}
        </Typography>
        {onSubmit && (
          <Button disabled={!canSubmit} onClick={onSubmit} color="inherit">
            {submitTitle}
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

const styles = {
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold' as 'bold',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
}

export default compose(
  withRouter,
  inject('uiStore'),
  observer,
  withStyles(styles),
)<AppHeaderProps>(AppHeader)
