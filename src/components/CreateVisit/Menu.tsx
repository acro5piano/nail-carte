import * as React from 'react'
import styled from 'styled-components'
import { Query, Mutation } from 'react-apollo'
import { VisitForm } from 'sarte/forms/VisitForm'
import MenuEntity from 'sarte/entities/Menu'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Flex from 'sarte/components/utils/Flex'
import { InputContainer, Caption } from 'sarte/components/CreateVisit/Presentational'
import { getMenus, createMenu } from 'sarte/services/graphqlQuery'

const Option = styled.div`
  padding: 12px;
  border: solid 1px #ccc;
  border-radius: 3px;
  margin-top: 12px;
  background: ${(props: { selected: boolean }) => (props.selected ? '#ccc' : '#fff')};
`

interface MenuOptionProps {
  menu: MenuEntity
  onClick: (id: string) => void
  selected: boolean
}

const MenuOption = ({ menu, onClick, selected }: MenuOptionProps) => {
  const _onClick = () => onClick(menu.id)
  return (
    <Option selected={selected} onClick={_onClick}>
      {menu.name}
    </Option>
  )
}

const InputWrap = styled.div`
  margin-top: 18px;
`

interface Props {
  visitForm: VisitForm
  onChange: (visitForm: VisitForm) => void
}

interface State {
  newMenu: string
}

class Menu extends React.Component<Props, State> {
  state = {
    newMenu: '',
  }

  onSelect = (menuId: String) => {
    this.props.onChange(
      new VisitForm({
        ...this.props.visitForm,
        menuId,
      }),
    )
  }

  onChangeNewMenu = (event: any) => this.setState({ newMenu: event.target.value })

  onCreateMenu = (action: (params: any) => Promise<any>, refetch: () => Promise<any>) => async () => {
    await action({
      variables: { name: this.state.newMenu },
    })
    await refetch()
    this.setState({ newMenu: '' })
  }

  render() {
    const { visitForm } = this.props
    const { newMenu } = this.state

    return (
      <div>
        <Caption>メニューを選択しましょう。</Caption>
        <Query query={getMenus}>
          {({ loading, data, refetch }) => {
            if (loading) return <p>Loading...</p>

            return (
              <InputContainer>
                {data.menus.map(menu => (
                  <MenuOption
                    key={menu.id}
                    selected={menu.id === visitForm.menuId}
                    menu={menu}
                    onClick={this.onSelect}
                  />
                ))}

                <InputWrap>
                  <Caption>メニューを追加する</Caption>
                  <Flex>
                    <TextField fullWidth color="primary" value={newMenu} onChange={this.onChangeNewMenu} />
                    <Mutation mutation={createMenu}>
                      {(createMenuAction, { data }) => (
                        <Button onClick={this.onCreateMenu(createMenuAction, refetch)}>追加</Button>
                      )}
                    </Mutation>
                  </Flex>
                </InputWrap>
              </InputContainer>
            )
          }}
        </Query>
      </div>
    )
  }
}

export default Menu
