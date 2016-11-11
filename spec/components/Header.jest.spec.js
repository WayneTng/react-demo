import React from 'react'
import renderer from 'react-test-renderer'
import Header from 'components/Header'

describe('<Header />', () => {
  it('renders a tagline', () => {
    const tagline = 'Hello, world!'
    const header = renderer.create(
      <Header tagline={tagline} />
    )

    const tree = header.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
