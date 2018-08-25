import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { withStyles, StyledComponentProps } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import AppHeader from 'sarte/components/AppHeader'
import AuthStore from 'sarte/stores/AuthStore'
import RootStore from 'sarte/stores/RootStore'

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

class Login extends React.Component<LoginProps & StyledComponentProps, LoginState> {
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
      this.props.history.push('/')
      this.props.rootStore.boot()
    } catch (err) {
      this.setState({ errors: '間違っています' })
      console.error(err)
    }
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <AppHeader noMenu title="ログイン" />
        <div className={classes.main}>
          <div>{this.state.errors}</div>
          <div className={classes.head}>
            <div className={classes.title}>Sally</div>
            <div className={classes.description}>ネイルサロンの経営管理ツール</div>
          </div>
          <Paper className={classes.paper}>
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
            <div className={classes.button}>
              <Button variant="raised" color="primary" onClick={this.submit} className={classes.submit}>
                ログイン
              </Button>
            </div>
          </Paper>
        </div>
      </div>
    )
  }
}

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  head: {
    marginTop: 40,
    textAlign: 'center' as 'center',
  },
  title: {
    fontWeight: 'bold' as 'bold',
    fontSize: 16,
  },
  paper: {
    marginTop: 30,
    padding: 18,
  },
  main: {
    width: 480,
  },
  submit: {
    marginTop: 40,
  },
  button: {
    textAlign: 'center' as 'center',
  },
}

export default withStyles(styles)(inject('authStore', 'rootStore')(observer(Login)))
