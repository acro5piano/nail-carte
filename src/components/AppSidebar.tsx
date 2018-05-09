import * as React from 'react'
import Drawer from 'material-ui/Drawer'
// import List from 'material-ui/List'
// import Divider from 'material-ui/Divider'

const sideList = (
  <div>
    An Item
  </div>
)

interface AppSidebarProps {
  open: boolean
  onClose: () => void
}

const AppSidebar = ({ open, onClose }: AppSidebarProps) => (
  <Drawer open={open} onClose={onClose}>
    <div
      tabIndex={0}
      role="button"
    >
      {sideList}
    </div>
  </Drawer>
)

export default AppSidebar
