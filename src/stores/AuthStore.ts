import { observable, decorate, runInAction } from 'mobx'
import BaseStore from 'sarte/stores/BaseStore'
import { AuthApi, TeamApi } from 'sarte/services/api'
import { LoginCredentials } from 'sarte/types'
import User, { UpdatableParams } from 'sarte/entities/User'

export const STORAGE_TOKEN = 'token'

export default class AuthStore extends BaseStore {
  authenticated: boolean = false
  user?: User

  async boot() {
    const token = localStorage.getItem(STORAGE_TOKEN)
    try {
      if (token === null) {
        this.authenticated = false
        return false
      }
      const user = await AuthApi.me()
      runInAction(() => {
        this.user = user
        this.authenticated = true
      })
      return true
    } catch (err) {
      localStorage.removeItem(STORAGE_TOKEN)
      return false
    }
  }

  async login(credentials: LoginCredentials) {
    try {
      const res = await AuthApi.login(credentials)
      runInAction(() => {
        this.authenticated = true
        this.user = new User(res.user)
      })
      localStorage.setItem(STORAGE_TOKEN, res.token)
    } catch (err) {
      throw err
    }
  }

  async register(credentials: LoginCredentials) {
    try {
      const res = await AuthApi.register(credentials)
      runInAction(() => {
        this.authenticated = true
        this.user = new User(res.user)
      })
      localStorage.setItem(STORAGE_TOKEN, res.token)
    } catch (err) {
      throw err
    }
  }

  async updateProfile(args: UpdatableParams) {
    try {
      const user = await AuthApi.updateMe(args)
      runInAction(() => {
        this.authenticated = true
        this.user = user
      })
    } catch (err) {
      throw err
    }
  }

  async registerTeam(name: string) {
    await TeamApi.create(name)
  }

  logout = () => {
    localStorage.removeItem(STORAGE_TOKEN)
  }
}

decorate(AuthStore, {
  authenticated: observable,
})
