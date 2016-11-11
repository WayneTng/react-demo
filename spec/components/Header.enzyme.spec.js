import React from 'react'
import { shallow } from 'enzyme'
import Header from 'components/Header'

describe('<Header />', () => {
  it('renders a tagline', () => {
    const tagline = 'Hello, world!'
    const header = shallow(
      <Header tagline={tagline} />
    )

    expect(header.text()).toContain(tagline)
  })
})
