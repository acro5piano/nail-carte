import { observable, decorate, flow } from 'mobx'
import BaseStore from 'sarte/stores/BaseStore'
import { AuthApi } from 'sarte/services/api'
import { LoginCredentials } from 'sarte/types'
import User from 'sarte/entities/User'

export const STORAGE_TOKEN = 'token'

export default class AuthStore extends BaseStore {
  authenticated: boolean = false
  user?: User

  boot = flow(function*(this: AuthStore) {
    const token = localStorage.getItem(STORAGE_TOKEN)
    try {
      if (token === null) {
        this.authenticated = false
        return false
      }
      const res = yield AuthApi.me()
      this.user = new User(res)
      this.authenticated = true
      return true
    } catch (err) {
      localStorage.removeItem(STORAGE_TOKEN)
      return false
    }
  })

  login = flow(function*(this: AuthStore, credentials: LoginCredentials) {
    try {
      const res = yield AuthApi.login(credentials)
      this.authenticated = true
      this.user = new User(res.user)
      localStorage.setItem(STORAGE_TOKEN, res.token)
    } catch (err) {
      throw err
    }
  })

  logout = () => {
    localStorage.removeItem(STORAGE_TOKEN)
  }
}

decorate(AuthStore, {
  authenticated: observable,
})
