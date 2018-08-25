import * as React from 'react'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'
import { TextFieldProps } from '@material-ui/core/TextField/TextField'
import Flex from 'sarte/components/utils/Flex'
import { VisitForm } from 'sarte/forms/VisitForm'
import { InputContainer, Caption } from 'sarte/components/CreateVisit/Presentational'
import SelectBrandDialog from './SelectBrandDialog'

const SectionTitleNoMargin = styled.div`
  font-weight: bold;
`

const SectionTitle = styled.div`
  font-weight: bold;
  margin-top: 36px;
`

const StyledTextField = styled(TextField as React.SFC<TextFieldProps>)`
  && {
    margin-left: 12px;
  }
`

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

  onChangeBrand = (name: string) => (value: string) => {
    this.props.onChange(this.props.visitForm.newInstance({ [name]: value }))
  }

  render() {
    const { visitForm } = this.props

    return (
      <div>
        <Caption>商材を選択しましょう。</Caption>
        <InputContainer>
          <SectionTitleNoMargin>ベース</SectionTitleNoMargin>
          <Flex>
            <SelectBrandDialog value={visitForm.baseBrand} onChange={this.onChangeBrand('baseBrand')} />
            <StyledTextField fullWidth name="baseSku" value={visitForm.baseSku} onChange={this.onChange} label="型番" />
          </Flex>

          <SectionTitle>カラー</SectionTitle>
          <Flex>
            <SelectBrandDialog value={visitForm.colorBrand} onChange={this.onChangeBrand('colorBrand')} />
            <StyledTextField
              fullWidth
              name="colorSku"
              value={visitForm.colorSku}
              onChange={this.onChange}
              label="型番"
            />
          </Flex>

          <SectionTitle>トップ</SectionTitle>
          <Flex>
            <SelectBrandDialog value={visitForm.topBrand} onChange={this.onChangeBrand('topBrand')} />
            <StyledTextField fullWidth name="topSku" value={visitForm.topSku} onChange={this.onChange} label="型番" />
          </Flex>
        </InputContainer>
      </div>
    )
  }
}

export default Components
