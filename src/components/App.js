import React from 'react'
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import Fish from './Fish'
import sampleFishes from '../sample-fishes'
// import base from '../base'
import database from '../database'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      fishes: {},
      order: {},
      inventory: {}
    }
  }

  componentWillMount() {
    const { storeId } = this.props.params
    database.ref(`${storeId}/fishes`).on('value', (snapshot) => {
      if (snapshot.val() !== null) {
        this.setState({fishes: snapshot.val()})
      }
    })
  }

  componentWillUnmount() {
    // base.removeBinding(this.ref)
  }

  loadSamples() {
    const { storeId } = this.props.params
    database.ref(`${storeId}/fishes`).set(
      sampleFishes
    )

    this.setState({
      fishes: sampleFishes
    })
  }

  addToOrder(key) {
    const order = { ...this.state.order }
    order[key] = order[key] + 1 || 1
    this.setState({
      order
    })
  }

  addFish(fish) {
    const fishes = { ...this.state.fishes }
    const timestamp = Date.now()
    const fishId = `fish-${ timestamp }`

    fishes[fishId] = fish
    this.setState({ fishes })

    const { storeId } = this.props.params
    database.ref(`${storeId}/fishes/${fishId}`).set(
      fish
    )
  }

  render() {
    const { fishes, order } = this.state
    return(
      <div className='catch-of-the-day'>
        <div className='menu'>
          <Header tagline='Fresh Seafood Market' />
          <ul className='list-of-fishes'>
            {
              Object.keys(fishes).map((key) => <Fish key={key} details={fishes[key]} addToOrder={(key) => this.addToOrder(key)} index={key}/>)
            }
          </ul>
        </div>
        <Order fishes={fishes} order={order} />
        <Inventory
          addFish={(fish) => this.addFish(fish)}
          loadSamples={() => this.loadSamples()}
          />
      </div>
    )
  }
}

export default App
