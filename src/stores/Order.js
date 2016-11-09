import { observable } from 'mobx'

class OrderStore {
  @observable order = {}

  constructor(storeId) {
    this.storeId = storeId
  }

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

class OrderStoreFactory {
  stores = {}

  getStore(storeId) {
    if (!this.stores[storeId]) {
      this.stores[storeId] = new OrderStore(storeId)
    }

    return this.stores[storeId]
  }
}

const orderStoreFactory = new OrderStoreFactory()
export default orderStoreFactory
