import * as React from 'react'
import Drawer from 'material-ui/Drawer'
import List from 'material-ui/List'
import { withStyles } from 'material-ui/styles'
import Divider from 'material-ui/Divider'

const SideList = ({ classes }) => (
  <div className={classes.list}>
    <List>An Item</List>
    <Divider />
    <List>Another Item</List>
  </div>
)

interface AppSidebarProps {
  isOpened: boolean,
  onCloseSidebar: () => void,
}

const AppSidebar = ({ classes, isOpened, onCloseSidebar }) => (
  <Drawer open={isOpened} onClose={onCloseSidebar}>
    <div
      tabIndex={0}
      role="button"
    >
      <SideList classes={classes} />
    </div>
  </Drawer>
)

const styles = theme => ({
  list: {
    width: 250,
  },
})

export default withStyles(styles)<AppSidebarProps>(AppSidebar)
