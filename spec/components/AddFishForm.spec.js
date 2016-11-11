import React from 'react'
import renderer from 'react-test-renderer'
import fishStoreFactory from 'stores/Fish'
import AddFishForm from 'components/AddFishForm'

describe('<AddFishForm />', () => {
  it('renders a fish form', () => {
    const store = fishStoreFactory.getStore('testStore')
    const addFishForm = renderer.create(
      <AddFishForm addFish={store.addFish} />
    )

    const tree = addFishForm.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
