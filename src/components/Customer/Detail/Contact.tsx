import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import Customer from 'sarte/entities/Customer'

interface ContactProps {
  customer: Customer
}

const Contact = ({ customer }: ContactProps) => (
  <div>
    <Grid container>
      <Grid item xs={3}>
        <div>Email</div>
        <div>Phone</div>
      </Grid>
      <Grid item xs={9}>
        <div>
          <a href={`mailto:${customer.email}`}>{customer.email}</a>
        </div>
        <div>{customer.phoneNumber}</div>
      </Grid>
    </Grid>
  </div>
)

export default Contact
