import * as React from 'react'
import Drawer from '@material-ui/core/Drawer'
import { withStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import SideListItem from './SideListItem'
import { HOME_PATH, CUSTOMER_LIST_PATH } from 'sarte/Routes'

const SideList = ({ classes, onSelect }) => (
  <div className={classes.list}>
    <SideListItem title="ホーム" path={HOME_PATH} onSelect={onSelect} />
    <Divider />
    <SideListItem title="顧客一覧" path={CUSTOMER_LIST_PATH} onSelect={onSelect} />
  </div>
)

interface AppSidebarProps {
  isOpened: boolean
  onCloseSidebar: () => void
}

const AppSidebar = ({ classes, isOpened, onCloseSidebar }) => (
  <Drawer open={isOpened} onClose={onCloseSidebar}>
    <div
      tabIndex={0}
      role="button"
    >
      <SideList classes={classes} onSelect={onCloseSidebar} />
    </div>
  </Drawer>
)

const styles = theme => ({
  list: {
    width: 250,
  },
})

export default withStyles(styles)<AppSidebarProps>(AppSidebar)
