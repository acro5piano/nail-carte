import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { compose } from 'recompose'
import Drawer from '@material-ui/core/Drawer'
import { withStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import SideListItem from 'sarte/components/AppSidebar/SideListItem'
import { HOME_PATH, CUSTOMER_LIST_PATH } from 'sarte/Routes'

const SideList = ({ classes, onSelect }) => (
  <div className={classes.list}>
    <SideListItem title="ホーム" path={HOME_PATH} onSelect={onSelect} />
    <Divider />
    <SideListItem title="顧客一覧" path={CUSTOMER_LIST_PATH} onSelect={onSelect} />
  </div>
)

interface AppSidebarProps {}

export const AppSidebar = ({ classes, uiStore }) => (
  <Drawer open={uiStore.isSidebarOpened} onClose={uiStore.toggleSidebar}>
    <div
      tabIndex={0}
      role="button"
    >
      <SideList classes={classes} onSelect={uiStore.toggleSidebar} />
    </div>
  </Drawer>
)

const styles = theme => ({
  list: {
    width: 250,
  },
})

export default compose(
  withStyles(styles),
  inject('uiStore'),
  observer,
)<AppSidebarProps>(AppSidebar)
