import * as React from 'react'
import { withStyles } from '@material-ui/core/styles'
import AppHeader from 'sarte/components/AppHeader'
import { VisitForm } from 'sarte/forms/VisitForm'
import TextField from '@material-ui/core/TextField'

interface VisitsProps {}

interface NewVisitProps {
  classes: any
  history: any
  createVisit: (customer: VisitForm) => void
}

interface NewVisitState {
  newVisit: VisitForm
}

class CreateVisit extends React.PureComponent<NewVisitProps, NewVisitState> {
  public state = {
    newVisit: new VisitForm(),
  }

  public render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <AppHeader hasBack onSubmit={this.submit} submitTitle="Create" />
        <div>
          <TextField
            name="name"
            type="text"
            label="Name"
            fullWidth
            defaultValue={this.state.newVisit.price}
            onChange={this.onUpdateName}
          />
        </div>
        <div className={classes.input}>
          <TextField
            name="email"
            type="datetime"
            label="Email"
            defaultValue={this.state.newVisit.startAt}
            onChange={this.onUpdateEmail}
          />
        </div>
        <div className={classes.input}>
          <TextField
            name="occupation"
            type="occupation"
            label="Occupation"
            defaultValue={this.state.newVisit.note}
            onChange={this.onUpdateEmail}
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

  private onUpdateName = event => this.handleChange('name')(event)

  private onUpdateEmail = event => this.handleChange('email')(event)

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
