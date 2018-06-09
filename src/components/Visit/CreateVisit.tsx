import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import AppHeader from 'sarte/components/AppHeader'
import { VisitForm } from 'sarte/forms/VisitForm'
import VisitPhoto from 'sarte/entities/VisitPhoto'
import TextField from '@material-ui/core/TextField'
import CustomerStore from 'sarte/stores/CustomerStore'
import { validate } from 'sarte/utils'

interface NewVisitProps {
  classes: any
  match: any
  uploadFile: (data: any) => void
  customerStore: CustomerStore
}

interface NewVisitState {
  visitForm: VisitForm
  visitPhotos: VisitPhoto[]
}

class CreateVisit extends React.Component<NewVisitProps, NewVisitState> {
  public state = {
    visitForm: new VisitForm(),
    visitPhotos: [],
  }

  public render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <AppHeader hasBack canSubmit={this.validate} title="来店を追加" onSubmit={this.submit} submitTitle="Create" />
        <div>
          <TextField
            name="price"
            type="number"
            label="Price"
            fullWidth
            defaultValue={this.state.visitForm.price}
            onChange={this.onUpdatePrice}
          />
        </div>
        <div className={classes.input}>
          <TextField
            name="note"
            label="Note"
            multiline
            fullWidth
            defaultValue={this.state.visitForm.note}
            onChange={this.onUpdateNote}
          />
        </div>
        <div className={classes.input}>
          <TextField
            name="startAt"
            type="datetime-local"
            label="Start At"
            defaultValue={this.state.visitForm.startAtForHuman}
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
            defaultValue={this.state.visitForm.endAtForHuman}
            onChange={this.onUpdateEndAt}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className={classes.input} onChange={this.onAddPhoto}>
          <div>
            Images
          </div>
          <input type="file" multiple />
        </div>
      </div>
    )
  }

  private get validate() {
    const { price, note, startAt, endAt } = this.state.visitForm
    return validate({
      price,
      note,
      startAt,
      endAt,
    }, {
      price: 'required|numeric',
      note: 'max:200',
      startAt: 'date',
      endAt: 'date',
    })
  }

  private handleChange = field => event => {
    const visitForm = new VisitForm({
      ...this.state.visitForm,
      [field]: event.target.value,
    })
    this.setState({ visitForm })
  }

  private onUpdatePrice = event => this.handleChange('price')(event)

  private onUpdateNote = event => this.handleChange('note')(event)

  private onUpdateStartAt = event => this.handleChange('startAt')(event)

  private onUpdateEndAt = event => this.handleChange('endAt')(event)

  private onAddPhoto = async(event) => {
    const visitPhotos = await Promise.all(Array.from(event.target.files).map(async(file) => {
      await this.props.customerStore.uploadPhoto(file)
      const visitPhoto = await this.props.customerStore.uploadPhoto(file)
      return visitPhoto
    }))
    console.log(visitPhotos)
    this.setState({
      visitPhotos: [
        ...this.state.visitPhotos,
        ...visitPhotos,
      ],
    })
  }

  private submit = () => {
    this.props.customerStore.createVisit(this.state)
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

export default compose(
  withStyles(styles),
  inject('customerStore'),
  observer,
)(CreateVisit)
