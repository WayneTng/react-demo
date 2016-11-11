import React from 'react'
import renderer from 'react-test-renderer'
import Order from 'components/Order'
import OrderStoreFactory from 'stores/Order'

jest.mock('react-dom')
jest.mock('react-addons-css-transition-group')

window.localStorage = {
  items: {},
  setItem: function(key, value) { this.items[key] = value },
  getItem: function(key) { return this.items[key] }
}

describe('<Order />', () => {
  it('renders the order list', () => {
    const store = OrderStoreFactory.getStore('testStore')
    store.addToOrder('fish1')
    store.addToOrder('fish2')

    const order = renderer.create(
      <Order storeId='testStore' />
    )

    const tree = order.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
