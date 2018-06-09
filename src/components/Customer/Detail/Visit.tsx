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
  root: {
    // backgroundColor: '#fff',
  },
  photo: {
    display: 'flex',
    justifyContent: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
  },
  basic: {
    padding: 12,
    backgroundColor: '#fff',
  },
  basicIcon: {
    fontSize: 12,
    marginRight: 8,
  },
  title: {
    padding: 12,
  },
}

export default compose(
  withStyles(styles),
)<VisitProps>(VisitComponent)
