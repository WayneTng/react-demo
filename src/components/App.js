import React from 'react'
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import Fish from './Fish'
import sampleFishes from '../sample-fishes'
import { database } from '../database'

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

    const localStorageRef = localStorage.getItem(`order-${storeId}`)

    if(localStorageRef) {
      this.setState({
        order: JSON.parse(localStorageRef)
      })
    }
  }

  componentWillUnmount() {
    // base.removeBinding(this.ref)
  }

  componentWillUpdate(nextProps, nextState) {
    const { storeId } = this.props.params
    localStorage.setItem(`order-${ storeId }`, JSON.stringify(nextState.order))
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

  removeFromOrder(key) {
    const order = {...this.state.order}
    delete order[key];
    this.setState({ order })
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

  updateFish(key, updatedFish) {
    const fishes = {...this.state.fishes}
    fishes[key] = updatedFish
    this.setState({
      fishes
    })
  }

  removeFish(key) {
    const { storeId } = this.props.params
    const fishes = {...this.state.fishes}

    delete fishes[key]
    this.setState({ fishes })
    database.ref(`${storeId}/fishes`).child(key).remove()
  }

  render() {
    const { fishes, order } = this.state
    const { storeId } = this.props.params
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
        <Order
          fishes={fishes}
          order={order}
          storeId={storeId}
          removeFromOrder={(key) => this.removeFromOrder(key)}
        />
        <Inventory
          addFish={(fish) => this.addFish(fish)}
          loadSamples={() => this.loadSamples()}
          fishes={fishes}
          updateFish={(key, updatedFish) => this.updateFish(key, updatedFish)}
          removeFish={(key) => this.removeFish(key)}
          storeId={storeId}
          />
      </div>
    )
  }
}

App.propTypes = {
  params: React.PropTypes.object.isRequired
}

export default App
