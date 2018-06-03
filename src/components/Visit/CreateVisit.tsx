import * as React from 'react'
import { withStyles } from '@material-ui/core/styles'
import AppHeader from 'sarte/components/AppHeader'
import { VisitForm } from 'sarte/forms/VisitForm'
import TextField from '@material-ui/core/TextField'

interface VisitsProps {}

interface NewVisitProps {
  classes: any
  match: any
  createVisit: (customer: VisitForm) => void
}

interface NewVisitState {
  newVisit: VisitForm
}

class CreateVisit extends React.PureComponent<NewVisitProps, NewVisitState> {
  public state = {
    newVisit: new VisitForm({
      customerId: this.props.match.id,
    }),
  }

  public render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <AppHeader hasBack title="New Visits" onSubmit={this.submit} submitTitle="Create" />
        <div>
          <TextField
            name="price"
            type="number"
            label="Price"
            fullWidth
            defaultValue={this.state.newVisit.price}
            onChange={this.onUpdatePrice}
          />
        </div>
        <div className={classes.input}>
          <TextField
            name="note"
            label="Note"
            multiline
            fullWidth
            defaultValue={this.state.newVisit.note}
            onChange={this.onUpdateNote}
          />
        </div>
        <div className={classes.input}>
          <TextField
            name="startAt"
            type="datetime-local"
            label="Start At"
            defaultValue={this.state.newVisit.startAtForHuman}
            onChange={this.onUpdateStartAt}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className={classes.input}>
          <TextField
            name="endAt"
            type="datetime-local"
            label="End At"
            defaultValue={this.state.newVisit.endAtForHuman}
            onChange={this.onUpdateEndAt}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
      </div>
    )
  }

  private handleChange = field => event => {
    const newVisit = new VisitForm({
      ...this.state.newVisit,
      [field]: event.target.value,
    })
    this.setState({ newVisit })
  }

  private onUpdatePrice = event => this.handleChange('price')(event)

  private onUpdateNote = event => this.handleChange('note')(event)

  private onUpdateStartAt = event => this.handleChange('startAt')(event)

  private onUpdateEndAt = event => this.handleChange('endAt')(event)

  private submit = () => this.props.createVisit(this.state.newVisit)
}

const styles = {
  root: {
    marginTop: 24,
    backgroundColor: '#fff',
    padding: 12,
  },
  input: {
    marginTop: 36,
  },
}

export default withStyles(styles)<VisitsProps>(CreateVisit)
