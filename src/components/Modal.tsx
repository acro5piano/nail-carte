// @flow

import * as React from 'react'
import Dialog from '@material-ui/core/Dialog'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import styled from 'styled-components'
import withMobileDialog, { InjectedProps } from '@material-ui/core/withMobileDialog'
import theme from 'sarte/theme'

const ModalHeader = withMobileDialog()(styled.div`
  background: ${theme.palette.primary.main};
  color: #fff;
  font-size: 18px;
  padding: 0 15px;
  align-items: center;
  display: flex;
  width: 100%;
  position: ${(props: InjectedProps) => (props.fullScreen ? 'fixed' : 'unset')};
  z-index: 1000;
  box-shadow: 1px 3px 3px rgba(0, 0, 0, 0.2);
  height: 56px;
`)

// const ModalContent = withMobileDialog()(styled<InjectedProps, 'div'>('div')`
const ModalContent = withMobileDialog()(styled.div`
  min-height: ${(props: InjectedProps) => (props.fullScreen ? '100vh' : '80vh')};
  min-width: ${props => (props.fullScreen ? '100%' : '800px')};
  padding-top: ${props => (props.fullScreen ? '56px' : 0)};
  background: #f5f5f5;
`)

const StyledIconButton = styled(IconButton as any)`
  && {
    margin-left: -12px;
    margin-right: 8px;
  }
`

interface Props {
  open: boolean
  title: string
  children: any
  onClose?: () => void
}

export const _Modal = ({ onClose, open, title, children, fullScreen }: Props & InjectedProps) => {
  return (
    <Dialog maxWidth="md" open={open} onClose={onClose} fullScreen={fullScreen}>
      <ModalHeader>
        {onClose && (
          <StyledIconButton color="inherit" onClick={onClose}>
            <CloseIcon />
          </StyledIconButton>
        )}
        <span>{title}</span>
      </ModalHeader>
      <ModalContent>{children}</ModalContent>
    </Dialog>
  )
}

export default withMobileDialog<Props>()(_Modal)
