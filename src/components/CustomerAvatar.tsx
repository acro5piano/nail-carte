import * as React from 'react'
import styled from 'styled-components'
import Avatar from '@material-ui/core/Avatar'
import ImageIcon from '@material-ui/icons/Image'
import Customer from 'sarte/entities/Customer'

const StyledAvatar = styled(Avatar as React.StatelessComponent<{ src?: string; size?: number }>)`
  && {
    width: ${props => (props.size ? props.size : 80)}px;
    height: ${props => (props.size ? props.size : 80)}px;
    margin: auto;
  }
`

interface VisitProps {
  customer: Customer
  size?: number
}

const CustomerAvatar = ({ customer, size }: VisitProps) => {
  if (customer.avatarUrl) {
    return <StyledAvatar src={customer.avatarUrl} size={size} />
  }

  return (
    <StyledAvatar size={size}>
      <ImageIcon />
    </StyledAvatar>
  )
}

export default CustomerAvatar
