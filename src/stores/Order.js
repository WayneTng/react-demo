import { observable } from 'mobx'

class OrderStore {
  @observable order = {}

  addToOrder(key) {
    this.order = {
      ...this.order,
      [key]: this.order[key] + 1 || 1
    }
  }

  removeFromOrder(key) {
    delete this.order[key]
    this.order = {...this.order}
  }
}

const singleton = new OrderStore()
export default singleton
