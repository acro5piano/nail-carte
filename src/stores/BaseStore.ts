import RootStore from 'sarte/stores/RootStore'

/*
 * @abstract
 */
export default class BaseStore {
  rootStore: RootStore

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
  }
}
