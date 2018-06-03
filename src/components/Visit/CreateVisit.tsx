import * as React from 'react'
import { withStyles } from '@material-ui/core/styles'
import AppHeader from 'sarte/components/AppHeader'
import { VisitForm } from 'sarte/forms/VisitForm'
import VisitPhoto from 'sarte/entities/VisitPhoto'
import TextField from '@material-ui/core/TextField'
import {
  FileApi,
} from 'sarte/services/api'

interface CreateVisitParams {
  newVisit: VisitForm
  visitPhotos: VisitPhoto[]
}

interface NewVisitProps {
  classes: any
  match: any
  createVisit: (data: CreateVisitParams) => void
  uploadFile: (data: any) => void
}

interface NewVisitState {
  newVisit: VisitForm
  visitPhotos: VisitPhoto[]
}

class CreateVisit extends React.PureComponent<NewVisitProps, NewVisitState> {
  public state = {
    newVisit: new VisitForm(),
    visitPhotos: [],
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
        Images
        <div className={classes.input} onChange={this.onAddPhoto}>
          <input type="file" />
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

  private onAddPhoto = async(event) => {
    const formData = new FormData()
    formData.append('file', event.target.files[0])
    const res = await FileApi.upload(formData)
    this.setState({
      visitPhotos: [
        ...this.state.visitPhotos,
        new VisitPhoto({ url: res.fileName, createAt: Number(new Date()) }),
      ],
    })
  }

  private submit = () => {
    const { newVisit, visitPhotos } = this.state
    newVisit.customerId = this.props.match.params.id,
    this.props.createVisit({ newVisit, visitPhotos })
  }
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

export default withStyles(styles)<NewVisitProps>(CreateVisit)
