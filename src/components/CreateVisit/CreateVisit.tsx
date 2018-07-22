import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { compose } from 'recompose'
import { Route, withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import CustomerStore from 'sarte/stores/CustomerStore'
import AppHeader from 'sarte/components/AppHeader'
import { VisitForm } from 'sarte/forms/VisitForm'
import { getLink } from 'sarte/Routes'
import VisitPhoto from 'sarte/entities/VisitPhoto'
// import { validate } from 'sarte/utils'
import TakePhoto from './TakePhoto'
import DateInput from './DateInput'
import Price from './Price'
import Note from './Note'

const steps = ['date', 'photo', 'menu', 'price', 'components', 'note']

interface NewVisitProps {
  classes: any
  match: any
  history: any
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

  onChange = (visitForm: VisitForm) => this.setState({ visitForm })

  private next = () => {
    const { history, match } = this.props
    const { id, step } = match.params

    if (step === 'note') {
      // submit
      return
    }

    const nextStep = steps[steps.indexOf(step) + 1]
    history.push(getLink('/customers/:id/visits/new/:step', id, nextStep))
  }

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

  // private get validate() {
  //   if (this.state.loading) {
  //     return false
  //   }
  //
  //   const { price, note, startAt, endAt } = this.state.visitForm
  //   return validate(
  //     {
  //       price,
  //       note,
  //       startAt,
  //       endAt,
  //     },
  //     {
  //       price: 'required|numeric|min:500',
  //       note: 'max:200',
  //       startAt: 'date',
  //       endAt: 'date',
  //     },
  //   )
  // }

  // private submit = async () => {
  //   await this.props.customerStore.createVisit(this.state)
  // }

  render() {
    const { classes } = this.props
    const { visitPhotos, visitForm } = this.state

    /* tslint:disable */
    return (
      <div className={classes.root}>
        <AppHeader hasBack title="来店を追加" onSubmit={this.next} submitTitle="次へ" />
        <Route
          path="/customers/:id/visits/new/date"
          render={() => <DateInput visitForm={visitForm} onChange={this.onChange} />}
        />
        <Route
          path="/customers/:id/visits/new/photo"
          render={() => <TakePhoto visitPhotos={visitPhotos} onChange={this.onAddPhoto} />}
        />
        <Route
          path="/customers/:id/visits/new/price"
          render={() => <Price visitForm={visitForm} onChange={this.onChange} />}
        />
        <Route
          path="/customers/:id/visits/new/note"
          render={() => <Note visitForm={visitForm} onChange={this.onChange} />}
        />
      </div>
    )
    /* tslint:enable */
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
  withRouter,
  withStyles(styles),
  inject('customerStore'),
  observer,
)(CreateVisit)
