import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { compose } from 'recompose'
import Drawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider'
import SideListItem from 'sarte/components/AppSidebar/SideListItem'
import { HOME_PATH, CUSTOMER_LIST_PATH, LOGIN_PATH } from 'sarte/Routes'

export const AppSidebar = ({ uiStore }) => (
  <Drawer open={uiStore.isSidebarOpened} onClick={uiStore.toggleSidebar}>
    <div tabIndex={0} role="button">
      <SideListItem title="ホーム" path={HOME_PATH} />
      <Divider />
      <SideListItem title="顧客一覧" path={CUSTOMER_LIST_PATH} />
      <SideListItem title="ログアウト" path={LOGIN_PATH} />
    </div>
  </Drawer>
)

export default compose(
  inject('uiStore'),
  observer,
)<{}>(AppSidebar)
