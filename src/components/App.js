import React from 'react'
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import Fish from './Fish'
import sampleFishes from '../sample-fishes'
import { database } from '../firebase'
import { observer } from 'mobx-react'

@observer class App extends React.Component {
  constructor() {
    super()
    this.state = {
      fishes: {},
      inventory: {}
    }
  }

  componentWillMount() {
    this.storeId = this.props.params.storeId
    database.ref(`${this.storeId}/fishes`).on('value', (snapshot) => {
      if (snapshot.val() !== null) {
        this.setState({fishes: snapshot.val()})
      }
    })

    const localStorageRef = localStorage.getItem(`order-${this.storeId}`)
    if (localStorageRef) {
      this.setState({
        order: JSON.parse(localStorageRef)
      })
    }
  }

  componentWillUnmount() {
    const { storeId } = this.props.params
    database.ref(`${storeId}/fishes`).off()
  }

  componentWillUpdate(nextProps, nextState) {
    // const { storeId } = this.props.params
    // localStorage.setItem(`order-${ storeId }`, JSON.stringify(nextState.order))
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

  addFish(fish) {
    const fishes = { ...this.state.fishes }
    const timestamp = Date.now()
    const fishId = `fish-${ timestamp }`

    fishes[fishId] = fish
    this.setState({ fishes })

    const { storeId } = this.props.params
    database.ref(`${storeId}/fishes/${fishId}`).set(fish)
  }

  updateFish(key, updatedFish) {
    const fishes = {...this.state.fishes}
    const { storeId } = this.props.params

    fishes[key] = updatedFish
    this.setState({ fishes })

    database.ref(`${storeId}/fishes`).child(key).update(updatedFish)
  }

  removeFish(key) {
    const { storeId } = this.props.params
    const fishes = {...this.state.fishes}

    delete fishes[key]
    this.setState({ fishes })
    database.ref(`${storeId}/fishes/${key}`).remove()
  }

  render() {
    const { fishes } = this.state

    return(
      <div className='catch-of-the-day'>
        <div className='menu'>
          <Header tagline='Fresh Seafood Market' />
          <ul className='list-of-fishes'>
            {
              Object.keys(fishes).map((key) =>
                <Fish
                  key={key}
                  index={key}
                  storeId={this.storeId}
                  details={fishes[key]}
                />
              )
            }
          </ul>
        </div>
        <Order
          fishes={fishes}
          storeId={this.storeId}
        />
        <Inventory
          addFish={(fish) => this.addFish(fish)}
          loadSamples={() => this.loadSamples()}
          fishes={fishes}
          updateFish={(key, updatedFish) => this.updateFish(key, updatedFish)}
          removeFish={(key) => this.removeFish(key)}
          storeId={this.storeId}
          />
      </div>
    )
  }
}

App.propTypes = {
  params: React.PropTypes.object.isRequired
}

export default App
