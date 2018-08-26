import * as React from 'react'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import AppHeader from 'sarte/components/AppHeader'
import AuthStore from 'sarte/stores/AuthStore'
import RootStore from 'sarte/stores/RootStore'
import { LOGIN_PATH } from 'sarte/Routes'
import { Root, Head, Title, StyledPaper, Main, Submit } from './styles'
import { validate } from 'sarte/utils'

export interface Props {
  authStore: AuthStore
  rootStore: RootStore
  classes: any
  history: any
}

export interface State {
  email: string
  password: string
  passwordConfirmation: string
  errors: string
}

class Login extends React.Component<Props, State> {
  state = {
    email: '',
    password: '',
    passwordConfirmation: '',
    errors: '',
  }

  onChange = (name: keyof State) => (event: any) => {
    this.setState({ [name as any]: event.target.value })
  }

  submit = async () => {
    const { email, password } = this.state
    try {
      await this.props.authStore.register({ email, password })
      window.location.href = '/'
    } catch (err) {
      this.setState({ errors: '間違っています' })
      console.error(err)
    }
  }

  get canSubmit(): boolean {
    const { email, password, passwordConfirmation } = this.state
    return (
      validate(
        {
          email,
          password,
          passwordConfirmation,
        },
        {
          email: 'required|email',
          password: 'required',
          passwordConfirmation: 'required',
        },
      ) && password === passwordConfirmation
    )
  }

  render() {
    return (
      <Root>
        <AppHeader noMenu title="新規登録" />
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
                onChange={this.onChange('email')}
                margin="normal"
                fullWidth
              />
            </div>
            <div>
              <TextField
                id="password"
                label="パスワード"
                value={this.state.password}
                onChange={this.onChange('password')}
                type="password"
                margin="normal"
                fullWidth
              />
            </div>
            <div>
              <TextField
                id="passwordConfirmation"
                label="パスワード (確認)"
                value={this.state.passwordConfirmation}
                onChange={this.onChange('passwordConfirmation')}
                type="password"
                margin="normal"
                fullWidth
              />
            </div>
            <Submit>
              <Button disabled={!this.canSubmit} variant="raised" color="primary" onClick={this.submit}>
                新規登録
              </Button>
            </Submit>
            <Head>
              登録済みのお客様ですか？ <Link to={LOGIN_PATH}>こちら</Link> からログインしましょう。
            </Head>
          </StyledPaper>
        </Main>
      </Root>
    )
  }
}

export default inject('authStore', 'rootStore')(observer(Login))
