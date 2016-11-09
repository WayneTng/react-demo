import { observable } from 'mobx'
import { database } from '../db/firebase'
import sampleFishes from '../db/seeds/fishes'

class FishStore {
  @observable fishes = {}

  constructor(storeId) {
    this.storeId = storeId
    this.loadSamples = this.loadSamples.bind(this)
    this.addFish = this.addFish.bind(this)
    this.updateFish = this.updateFish.bind(this)
    this.removeFish = this.removeFish.bind(this)

    database.ref(`${this.storeId}/fishes`).on('value', (snapshot) => {
      if (snapshot.val() !== null) {
        this.fishes = snapshot.val()
      }
    })
  }

  loadSamples() {
    Object.keys(sampleFishes).forEach((key) => {
      this.addFish(sampleFishes[key])
    })
  }


  addFish(fish) {
    const newFish = database.ref(`${this.storeId}/fishes`).push()

    this.fishes = {
      ...this.fishes,
      [newFish.key]: fish
    }

    newFish.set(fish)
  }

  updateFish(key, updatedFish) {
    this.fishes = {
      ...this.fishes,
      [key]: updatedFish
    }

    database.ref(`${this.storeId}/fishes/${key}`).update(updatedFish)
  }

  removeFish(key) {
    delete this.fishes[key]
    this.fishes = {...this.fishes}

    database.ref(`${this.storeId}/fishes/${key}`).remove()
  }
}

class FishStoreFactory {
  stores = {}

  getStore(storeId) {
    if (!this.stores[storeId]) {
      this.stores[storeId] = new FishStore(storeId)
    }

    return this.stores[storeId]
  }

}

const fishStoreFactory = new FishStoreFactory()
export default fishStoreFactory
