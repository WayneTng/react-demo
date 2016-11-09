import { observable } from 'mobx'

class OrderStore {
  @observable order = {}

  constructor(storeId) {
    this.storeId = storeId
    this.localStorageKey = `order-${this.storeId}`

    const localStorageRef = localStorage.getItem(this.localStorageKey)
    if (localStorageRef) {
      this.order = JSON.parse(localStorageRef)
    }
  }

  saveToLocalStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.order))
  }

  addToOrder(key) {
    this.order = {
      ...this.order,
      [key]: this.order[key] + 1 || 1
    }

    this.saveToLocalStorage()
  }

  removeFromOrder(key) {
    delete this.order[key]
    this.order = {...this.order}
    this.saveToLocalStorage()
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
