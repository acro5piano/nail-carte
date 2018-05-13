import { StoreGroup } from 'almin'
import { AppSidebarStore } from './AppSidebarStore'

export const createAppStoreGroup = () => {
  return new StoreGroup({
    appSidebarState: new AppSidebarStore(),
  })
}

export const appStoreGroup = createAppStoreGroup()
