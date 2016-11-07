import React from 'react'
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      fishes: {},
      order: {},
      inventory: {}
    }
  }

  addFish(fish) {
    const fishes = {...this.state.fishes}
    const timestamp = Date.now()

    fishes[`fish-${timestamp}`] = fish

    this.setState({ fishes })
  }

  render() {
    return(
      <div className='catch-of-the-day'>
        <div className='menu'>
          <Header tagline='Fresh Seafood Market' />
        </div>
        <Order />
        <Inventory addFish={(fish) => this.addFish(fish)} />
      </div>
    )
  }
}

export default App
