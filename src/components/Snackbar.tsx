import * as React from 'react'
import { observer } from 'mobx-react'
import BaseSnackbar from '@material-ui/core/Snackbar'
import UiStore from 'sarte/stores/UiStore'

export interface LoginProps {
  uiStore: UiStore
}

export interface LoginState {
  isOpen: boolean
}

const Snackbar: React.SFC<LoginProps> = ({ uiStore }: LoginProps) => {
  return (
    <BaseSnackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      message={<span id="message-id">{uiStore.message}</span>}
      open={uiStore.hasMessage}
      autoHideDuration={6000}
      onClose={uiStore.hideMessage}
    />
  )
}

// const styles = {}

export default observer(Snackbar)
