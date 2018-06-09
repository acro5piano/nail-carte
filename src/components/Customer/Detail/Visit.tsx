import * as React from 'react'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import Visit from 'sarte/entities/Visit'

interface VisitProps {
  classes: any
  match: any
  visit: Visit
}

const VisitComponent = ({ classes, visit }: VisitProps) => (
  <div className={classes.root}>
    <div className={classes.basic}>
      {visit.note}
    </div>
  </div>
)

const styles = {
  photo: {
    display: 'flex',
    justifyContent: 'center',
  },
  basic: {
    padding: 12,
    backgroundColor: '#fff',
  },
  title: {
    padding: 12,
  },
}

export default compose(
  withStyles(styles),
)<VisitProps>(VisitComponent)
