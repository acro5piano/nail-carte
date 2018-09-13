import * as React from 'react'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import AppHeader from 'sarte/components/AppHeader'
import AuthStore from 'sarte/stores/AuthStore'
import RootStore from 'sarte/stores/RootStore'

const Root = styled.div`
  padding-top: 24px;
`
const Caption = styled.div`
  padding: 0 12px;
`
const StyledPaper = styled(Paper as React.SFC<any>)`
  margin-top: 30px;
  padding: 18px;
  width: 100%;
`
const Submit = styled.div`
  margin-top: 40px;
  text-align: center;
`

export interface Props {
  authStore: AuthStore
  rootStore: RootStore
  classes: any
  history: any
}

export interface State {
  teamName: string
}

class Login extends React.Component<Props, State> {
  state = {
    teamName: '',
  }

  onChange = (event: any) => {
    this.setState({ teamName: event.target.value })
  }

  submit = async () => {
    try {
      await this.props.authStore.registerTeam(this.state.teamName)
      window.location.href = '/'
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    return (
      <Root>
        <AppHeader title="サロン名の登録" />
        <Caption>サロン名を登録しましょう。</Caption>
        <StyledPaper>
          <div>
            <TextField
              id="name"
              label="サロン名"
              value={this.state.teamName}
              onChange={this.onChange}
              margin="normal"
              fullWidth
            />
          </div>
          <Submit>
            <Button variant="raised" color="primary" onClick={this.submit}>
              登録
            </Button>
          </Submit>
        </StyledPaper>
      </Root>
    )
  }
}

export default inject('authStore', 'rootStore')(observer(Login))
