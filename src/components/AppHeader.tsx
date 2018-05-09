import * as React from 'react'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'

const AppHeader = () => (
  <AppBar>
    <Toolbar>
      <Typography variant="title" color="inherit" noWrap className="AppHeaderContainer-title">
          Title
      </Typography>
    </Toolbar>
  </AppBar>
)

export default AppHeader
