import * as React from 'react'
import styled from 'styled-components'
import Avatar from '@material-ui/core/Avatar'
import ImageIcon from '@material-ui/icons/Image'
import Customer from 'sarte/entities/Customer'

interface StyledAvatarProps {
  src?: string
  size?: number
  onClick?: () => void
}

const StyledAvatar = styled(Avatar as React.StatelessComponent<StyledAvatarProps>)`
  && {
    width: ${props => (props.size ? props.size : 80)}px;
    height: ${props => (props.size ? props.size : 80)}px;
    margin: auto;
  }
`

interface VisitProps {
  customer: Customer
  size?: number
  onClick?: () => void
}

const CustomerAvatar = ({ customer, size, onClick }: VisitProps) => {
  if (customer.avatarUrl) {
    return <StyledAvatar onClick={onClick} src={customer.avatarUrl} size={size} />
  }

  return (
    <StyledAvatar onClick={onClick} size={size}>
      <ImageIcon />
    </StyledAvatar>
  )
}

export default CustomerAvatar
