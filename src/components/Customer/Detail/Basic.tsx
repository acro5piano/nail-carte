import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import styled from 'styled-components'
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter'
import PlaceIcon from '@material-ui/icons/Place'
import CakeIcon from '@material-ui/icons/Cake'
import Customer from 'sarte/entities/Customer'
import Flex from 'sarte/components/utils/Flex'
import CustomerAvatar from 'sarte/components/CustomerAvatar'

const IconWrap = styled.span`
  font-size: 12px;
  margin-right: 8px;
`

interface VisitProps {
  customer: Customer
}

const VisitComponent = ({ customer }: VisitProps) => (
  <div>
    <Grid container spacing={16}>
      <Grid item xs={4}>
        <Flex>
          <CustomerAvatar customer={customer} />
        </Flex>
      </Grid>
      <Grid item xs={8}>
        <div>
          <IconWrap>
            <BusinessCenterIcon style={{ fontSize: 12 }} />
          </IconWrap>
          {customer.occupation}
        </div>
        <div>
          <IconWrap>
            <CakeIcon style={{ fontSize: 12 }} />
          </IconWrap>
          {customer.birthdayForHuman}
          {customer.birthday && <span> ({customer.age})</span>}
        </div>
        <div>
          <IconWrap>
            <PlaceIcon style={{ fontSize: 12 }} />
          </IconWrap>
          {customer.address}
        </div>
      </Grid>
    </Grid>
  </div>
)

export default VisitComponent
