import * as React from 'react'
import Drawer from 'material-ui/Drawer'
import List from 'material-ui/List'
import { withStyles } from 'material-ui/styles'
import Divider from 'material-ui/Divider'
import { CloseSidebarUseCase } from '../use-case/ToggleAppSidebarUseCase'
import { appContextLocator } from '../AppContextLocator'

const SideList = ({ classes }) => (
  <div className={classes.list}>
    <List>An Item</List>
    <Divider />
    <List>Another Item</List>
  </div>
)

interface AppSidebarProps {
  open: boolean
}

const closeSidebar = () => appContextLocator.context.useCase(new CloseSidebarUseCase()).execute()

const AppSidebar = ({ classes, open }) => (
  <Drawer open={open} onClose={closeSidebar}>
    <div
      tabIndex={0}
      role="button"
    >
      <SideList classes={classes} />
    </div>
  </Drawer>
)

const styles = {
  list: {
    width: 250,
  },
}

export default withStyles(styles)<AppSidebarProps>(AppSidebar)
