import * as React from 'react'
import styled from 'styled-components'
import { getBrands } from 'sarte/services/graphqlQuery'
import { Query } from 'react-apollo'
import { VisitForm } from 'sarte/forms/VisitForm'
import { InputContainer, Caption } from 'sarte/components/CreateVisit/Presentational'
import BlockInput from 'sarte/components/utils/BlockInput'
import FlatOption from 'sarte/components/utils/FlatOption'
import Modal from 'sarte/components/Modal'

const Container = styled.div`
  margin-top: 12px;
`

interface Props {
  visitForm: VisitForm
  onChange: (visitForm: VisitForm) => void
}

interface State {
  brandSelecting: boolean
}

class Components extends React.Component<Props, State> {
  state = {
    brandSelecting: false,
  }

  onChange = (event: any) =>
    this.props.onChange(this.props.visitForm.newInstance({ [event.target.name]: event.target.value }))

  openBrandModal = (e: any) => this.setState({ brandSelecting: true })

  closeBrandModal = () => this.setState({ brandSelecting: false })

  onChangeBrand = (base: string) => () => {
    this.props.onChange(this.props.visitForm.newInstance({ base }))
    this.setState({ brandSelecting: false })
  }

  render() {
    const { visitForm } = this.props
    const { brandSelecting } = this.state

    return (
      <div>
        <Caption>商材を選択しましょう。</Caption>
        <InputContainer>
          <BlockInput
            inputProps={{ disabled: true }}
            fullWidth
            onClick={this.openBrandModal}
            name="base"
            value={visitForm.base}
            onChange={this.onChange}
            label="ベース"
          />
          <BlockInput fullWidth name="color" value={visitForm.color} onChange={this.onChange} label="カラー" />
          <BlockInput fullWidth name="top" value={visitForm.top} onChange={this.onChange} label="トップ" />
        </InputContainer>
        <Modal title="ブランドの選択" open={brandSelecting} onClose={this.closeBrandModal}>
          <Container>
            <InputContainer>
              <BlockInput fullWidth name="base" value={visitForm.base} onChange={this.onChange} label="ベース" />
              <Query query={getBrands}>
                {({ loading, data }) => {
                  if (loading) {
                    return <div>loading...</div>
                  }

                  return data.brands.filter(b => b.name.toLowerCase().includes(visitForm.base)).map(brand => {
                    return (
                      <FlatOption
                        key={brand.name}
                        onClick={this.onChangeBrand(brand.name)}
                        selected={visitForm.base === brand.name}
                      >
                        {brand.name}
                      </FlatOption>
                    )
                  })
                }}
              </Query>
            </InputContainer>
          </Container>
        </Modal>
      </div>
    )
  }
}

export default Components
