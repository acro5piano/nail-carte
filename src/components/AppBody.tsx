import * as React from 'react'
import FloatingActionButton from './material-ui/Button/FloatingActionButton'
import { withStyles } from 'material-ui/styles'
import Customers from './pages/Customers/Customers'

interface AppBodyProps {}

const notify = () => alert('hello')

const AppBody = ({ classes }) => (
  <div className="appBody">
    <FloatingActionButton onClick={notify} />
    <Customers />
  </div>
)

const styles = {
  root: {
    marginTop: 24,
    backgroundColor: '#fff',
    padding: 12,
  },
}

export default withStyles(styles)<AppBodyProps>(AppBody)
