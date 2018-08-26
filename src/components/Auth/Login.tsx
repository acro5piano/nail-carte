import * as React from 'react'
import { validate } from 'sarte/utils'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import AppHeader from 'sarte/components/AppHeader'
import AuthStore from 'sarte/stores/AuthStore'
import RootStore from 'sarte/stores/RootStore'
import { REGISTER_PATH } from 'sarte/Routes'
import { Root, Head, Title, StyledPaper, Main, Submit } from './styles'

export interface LoginProps {
  authStore: AuthStore
  rootStore: RootStore
  classes: any
  history: any
}

export interface LoginState {
  email: string
  password: string
  errors: string
}

class Login extends React.Component<LoginProps, LoginState> {
  state = {
    email: '',
    password: '',
    errors: '',
  }

  componentDidMount() {
    this.props.authStore.logout()
  }

  onChangeEmail = (event: any) => {
    this.setState({ email: event.target.value })
  }

  onChangePassword = (event: any) => {
    this.setState({ password: event.target.value })
  }

  submit = async (event: any) => {
    const { email, password } = this.state
    try {
      await this.props.authStore.login({ email, password })
      window.location.href = '/'
    } catch (err) {
      this.setState({ errors: '間違っています' })
      console.error(err)
    }
  }

  get canSubmit(): boolean {
    const { email, password } = this.state
    return validate(
      {
        email,
        password,
      },
      {
        email: 'required|email',
        password: 'required|min:6',
      },
    )
  }

  render() {
    return (
      <Root>
        <AppHeader noMenu title="ログイン" />
        <Main>
          <div>{this.state.errors}</div>
          <Head>
            <Title>Sally</Title>
            <div>ネイルサロンの経営管理ツール</div>
          </Head>
          <StyledPaper>
            <div>
              <TextField
                id="name"
                label="メールアドレス"
                value={this.state.email}
                onChange={this.onChangeEmail}
                margin="normal"
                fullWidth
              />
            </div>
            <div>
              <TextField
                id="password"
                label="パスワード"
                value={this.state.password}
                onChange={this.onChangePassword}
                type="password"
                margin="normal"
                fullWidth
              />
            </div>
            <Submit>
              <Button disabled={!this.canSubmit} variant="raised" color="primary" onClick={this.submit}>
                ログイン
              </Button>
            </Submit>
            <Head>
              新しいお客様ですか？ <Link to={REGISTER_PATH}>こちら</Link> から新規登録しましょう。
            </Head>
          </StyledPaper>
        </Main>
      </Root>
    )
  }
}

export default inject('authStore', 'rootStore')(observer(Login))
