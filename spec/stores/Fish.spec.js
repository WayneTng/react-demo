import fishStoreFactory from 'stores/Fish'

describe('FishStore', () => {
  it('returns a store', () => {
    const store = fishStoreFactory.getStore('testStore')
    expect(store.fishes).toEqual({})
  })

  // Firebase returns a promise which the test case
  // did not resolve hence data is not written to firebase
  it('adds a fish', () => {
    const store = fishStoreFactory.getStore('testStore')
    const fish = {
       desc: "Everyones favorite white fish. We will cut it t...",
       image: "http://i.istockimg.com/file_thumbview_approve/3...",
       name: "Pacific Halibut",
       price: 1724,
       status: "available"
    }
    store.addFish(fish)
    const key = Object.keys(store.fishes)
    expect(key.length).toEqual(1)
    expect(store.fishes[key].name).toEqual(fish.name)
  })
})
