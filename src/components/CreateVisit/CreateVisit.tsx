import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { compose } from 'recompose'
import { Route } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import CustomerStore from 'sarte/stores/CustomerStore'
import AppHeader from 'sarte/components/AppHeader'
import { VisitForm } from 'sarte/forms/VisitForm'
import VisitPhoto from 'sarte/entities/VisitPhoto'
import { validate } from 'sarte/utils'
import TakePhoto from './TakePhoto'

interface NewVisitProps {
  classes: any
  match: any
  uploadFile: (data: any) => void
  customerStore: CustomerStore
}

interface NewVisitState {
  visitForm: VisitForm
  visitPhotos: VisitPhoto[]
  loading: boolean
}

class CreateVisit extends React.Component<NewVisitProps, NewVisitState> {
  public state = {
    visitForm: new VisitForm(),
    visitPhotos: [],
    loading: false,
  }

  public render() {
    const { classes } = this.props
    const { visitPhotos } = this.state

    /* tslint:disable */
    return (
      <div className={classes.root}>
        <AppHeader hasBack canSubmit={this.validate} title="来店を追加" onSubmit={this.submit} submitTitle="追加" />
        <Route
          path="/customers/:id/visits/new/photo"
          render={() => <TakePhoto visitPhotos={visitPhotos} onChange={this.onAddPhoto} />}
        />
        <Route
          path="/customers/:id/visits/new/note"
          render={() => (
            <div>
              <TextField
                name="price"
                type="number"
                label="金額"
                fullWidth
                defaultValue={this.state.visitForm.price}
                onChange={this.onUpdatePrice}
              />
            </div>
          )}
        />
        <div className={classes.input}>
          <TextField
            name="note"
            label="メモ"
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
            label="来店時間"
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
            label="終了時間"
            defaultValue={this.state.visitForm.endAtForHuman}
            onChange={this.onUpdateEndAt}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        )}
      </div>
    )
    /* tslint:enable */
  }

  private get validate() {
    if (this.state.loading) {
      return false
    }

    const { price, note, startAt, endAt } = this.state.visitForm
    return validate(
      {
        price,
        note,
        startAt,
        endAt,
      },
      {
        price: 'required|numeric|min:500',
        note: 'max:200',
        startAt: 'date',
        endAt: 'date',
      },
    )
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

  private onAddPhoto = async event => {
    this.setState({ loading: true })
    const visitPhotos = await Promise.all(
      Array.from(event.target.files).map(async file => {
        await this.props.customerStore.uploadPhoto(file)
        const visitPhoto = await this.props.customerStore.uploadPhoto(file)
        return visitPhoto
      }),
    )
    this.setState({
      visitPhotos: [...this.state.visitPhotos, ...visitPhotos],
      loading: false,
    })
  }

  private submit = async () => {
    await this.props.customerStore.createVisit(this.state)
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
