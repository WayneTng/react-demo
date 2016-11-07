import React from 'react'
import AddFishForm from './AddFishForm'

class Inventory extends React.Component {
  render() {
    const { addFish } = this.props

    return(
      <div>
        <h2> Inventory </h2>
        <AddFishForm addFish={addFish} />
      </div>
    )
  }
}

export default Inventory
