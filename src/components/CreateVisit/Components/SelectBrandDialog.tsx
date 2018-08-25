import * as React from 'react'
import FlatOption from 'sarte/components/utils/FlatOption'
import Modal from 'sarte/components/Modal'
import styled from 'styled-components'
import { getBrands } from 'sarte/services/graphqlQuery'
import { Query } from 'react-apollo'
import { InputContainer } from 'sarte/components/CreateVisit/Presentational'
import BlockInput from 'sarte/components/utils/BlockInput'
import { InputEvent } from 'sarte/types'

const Container = styled.div`
  margin-top: 12px;
`

interface Props {
  value: string
  onChange: (brand: string) => void
}

interface State {
  open: boolean
}

export default class SelectBrancDialog extends React.Component<Props, State> {
  state = {
    open: false,
  }

  open = () => this.setState({ open: true })

  close = () => this.setState({ open: false })

  onSelect = (base: string) => () => {
    this.props.onChange(base)
    this.setState({ open: false })
  }

  onInput = (event: InputEvent) => {
    this.props.onChange(event.target.value)
  }

  render() {
    const { value } = this.props
    const { open } = this.state

    return (
      <React.Fragment>
        <BlockInput
          inputProps={{ disabled: true }}
          fullWidth
          onClick={this.open}
          name="base"
          value={value}
          label="ベース"
        />
        <Modal title="ブランドの選択" open={open} onClose={this.close}>
          <Container>
            <InputContainer>
              <BlockInput autoFocus fullWidth name="base" value={value} onChange={this.onInput} label="ベース" />
              <Query query={getBrands}>
                {({ loading, data }) => {
                  if (loading) {
                    return <div>loading...</div>
                  }

                  return data.brands.filter(b => b.name.toLowerCase().includes(value)).map(brand => {
                    return (
                      <FlatOption key={brand.name} onClick={this.onSelect(brand.name)} selected={value === brand.name}>
                        {brand.name}
                      </FlatOption>
                    )
                  })
                }}
              </Query>
            </InputContainer>
          </Container>
        </Modal>
      </React.Fragment>
    )
  }
}
