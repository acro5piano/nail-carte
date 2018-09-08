import * as React from 'react'
import { inject, observer } from 'mobx-react'
// import styled from 'styled-components'
import { compose } from 'recompose'
import { Route, withRouter } from 'react-router-dom'
import { getLink, CUSTOMER_PATH /* CREATE_VISIT_PATH */ } from 'sarte/Routes'
import CustomerStore from 'sarte/stores/CustomerStore'
import AppHeader from 'sarte/components/AppHeader'
import { VisitForm } from 'sarte/forms/VisitForm'
import VisitPhoto from 'sarte/entities/VisitPhoto'
// import { validate } from 'sarte/utils'
import TakePhoto from 'sarte/components/CreateVisit/TakePhoto'
import DateInput from 'sarte/components/CreateVisit/DateInput'
import Price from 'sarte/components/CreateVisit/Price'
import Note from 'sarte/components/CreateVisit/Note'
import Menu from 'sarte/components/CreateVisit/Menu'
import Components from 'sarte/components/CreateVisit/Components/Components'
import _ from 'lodash'

const steps = ['date', 'photo', 'menu', 'components', 'price', 'note']

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
    visitForm: new VisitForm({}),
    visitPhotos: [],
    loading: false,
  }

  componentDidMount() {
    const { match } = this.props
    if (match.visitId !== 'new') {
      this.props.customerStore.setCurrentCustomerId(match.params.id)
      this.setState({
        visitForm: new VisitForm(
          this.props.customerStore.findCurrentCustomerVisitByVisitId(match.params.visitId),
        ),
      })
    }
  }

  onChange = (visitForm: VisitForm) => this.setState({ visitForm })

  private next = () => {
    const { history, match } = this.props
    const { id, step } = match.params

    if (step === _.last(steps)) {
      return this.submit()
    }

    const nextStep = steps[steps.indexOf(step) + 1]
    history.push(
      getLink('/customers/:id/visits/:visitId/:step', id, match.params.visitId, nextStep),
    )
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

  private get submitTitle(): string {
    if (this.props.match.params.step === _.last(steps)) {
      return '完了'
    }
    return '次へ'
  }

  private submit = async () => {
    await this.props.customerStore.createVisit(this.state)
    this.props.history.push(getLink(CUSTOMER_PATH, this.props.match.params.id))
  }

  render() {
    const { visitPhotos, visitForm } = this.state

    /* tslint:disable */
    return (
      <div>
        <AppHeader hasBack title="来店を追加" onSubmit={this.next} submitTitle={this.submitTitle} />
        <Route
          path="/customers/:id/visits/:visitId/date"
          render={() => <DateInput visitForm={visitForm} onChange={this.onChange} />}
        />
        <Route
          path="/customers/:id/visits/:visitId/photo"
          render={() => <TakePhoto visitPhotos={visitPhotos} onChange={this.onAddPhoto} />}
        />
        <Route
          path="/customers/:id/visits/:visitId/menu"
          render={() => <Menu visitForm={visitForm} onChange={this.onChange} />}
        />
        <Route
          path="/customers/:id/visits/:visitId/components"
          render={() => <Components visitForm={visitForm} onChange={this.onChange} />}
        />
        <Route
          path="/customers/:id/visits/:visitId/price"
          render={() => <Price visitForm={visitForm} onChange={this.onChange} />}
        />
        <Route
          path="/customers/:id/visits/:visitId/note"
          render={() => <Note visitForm={visitForm} onChange={this.onChange} />}
        />
      </div>
    )
    /* tslint:enable */
  }
}

export default compose(
  withRouter,
  inject('customerStore'),
  observer,
)(CreateVisit)

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
