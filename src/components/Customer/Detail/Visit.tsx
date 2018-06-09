import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import { compose } from 'recompose'
import { withStyles, WithStyles } from '@material-ui/core/styles'
import Visit from 'sarte/entities/Visit'
import VisitPhoto from 'sarte/entities/VisitPhoto'

interface VisitProps {
  classes: any
  match: any
  visit: Visit
}

interface PhotoProps {
  photo: VisitPhoto
}

const PhotoComponent: React.SFC<any> = ({ photo, classes }: PhotoProps & WithStyles) => (
  <div>
    <img className={classes.photo} src={photo.url} />
  </div>
)

const photoStyles = {
  photo: {
    borderRadius: 3,
    width: '100%',
  },
}

const Photo = withStyles(photoStyles)<PhotoProps>(PhotoComponent)

const VisitComponent = ({ classes, visit }: VisitProps) => (
  <div className={classes.root}>
    <div className={classes.basic}>
      <Grid container spacing={16}>
        <Grid item xs={4}>
          {visit.visitPhotos.map(photo => <Photo key={photo.id} photo={photo} />)}
        </Grid>
        <Grid item xs={8}>
          {visit.note}
        </Grid>
      </Grid>
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
