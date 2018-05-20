import * as React from 'react'
import { CUSTOMER_LIST_PATH } from 'sarte/Routes'

const NotFound = () =>
  <div>
    <h3>Not Found</h3>
    <a href={CUSTOMER_LIST_PATH}>Customers</a>
  </div>

export default NotFound
