import React from 'react'
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import Fish from './Fish'
import { observer } from 'mobx-react'
import FishStore from '../stores/Fish'

@observer class App extends React.Component {
  componentWillMount() {
    this.fishStore = FishStore.getStore(this.props.params.storeId)
  }

  render() {
    const { fishes } = this.fishStore
    const { storeId } = this.props.params

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
                  storeId={storeId}
                  details={fishes[key]}
                />
              )
            }
          </ul>
        </div>
        <Order storeId={storeId} />
        <Inventory storeId={storeId} />
      </div>
    )
  }
}

App.propTypes = {
  params: React.PropTypes.object.isRequired
}

export default App
