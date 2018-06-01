import * as React from 'react'
import { Link } from 'react-router-dom'
import { CUSTOMER_LIST_PATH } from 'sarte/Routes'

const NotFound = () =>
  <div>
    <h3>Not Found</h3>
    <Link to={CUSTOMER_LIST_PATH}>Customers</Link>
  </div>

export default NotFound
