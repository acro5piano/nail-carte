import * as React from 'react'
import { VisitForm } from 'sarte/forms/VisitForm'
import { InputContainer, Caption } from 'sarte/components/CreateVisit/Presentational'
import BlockInput from 'sarte/components/utils/BlockInput'
import SelectBrandDialog from './SelectBrandDialog'

interface Props {
  visitForm: VisitForm
  onChange: (visitForm: VisitForm) => void
}

interface State {}

class Components extends React.Component<Props, State> {
  onChange = (event: any) =>
    this.props.onChange(this.props.visitForm.newInstance({ [event.target.name]: event.target.value }))

  openBrandModal = (e: any) => this.setState({ brandSelecting: true })

  closeBrandModal = () => this.setState({ brandSelecting: false })

  onChangeBrand = (base: string) => {
    this.props.onChange(this.props.visitForm.newInstance({ base }))
  }

  render() {
    const { visitForm } = this.props

    return (
      <div>
        <Caption>商材を選択しましょう。</Caption>
        <InputContainer>
          <SelectBrandDialog value={visitForm.base} onChange={this.onChangeBrand} />
          <BlockInput fullWidth name="color" value={visitForm.color} onChange={this.onChange} label="カラー" />
          <BlockInput fullWidth name="top" value={visitForm.top} onChange={this.onChange} label="トップ" />
        </InputContainer>
      </div>
    )
  }
}

export default Components
