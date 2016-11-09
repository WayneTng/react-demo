import React from 'react'
import Header from '../components/Header'
import Order from '../components/Order'
import Inventory from '../components/Inventory'
import Fish from '../components/Fish'
import { observer } from 'mobx-react'
import FishStore from '../stores/Fish'

@observer class Main extends React.Component {
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

Main.propTypes = {
  params: React.PropTypes.object.isRequired
}

export default Main
