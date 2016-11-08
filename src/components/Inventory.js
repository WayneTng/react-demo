import React from 'react'
import AddFishForm from './AddFishForm'

class Inventory extends React.Component {
  handleChange(e, key) {
    const { fishes, updateFish } = this.props
    const fish = fishes[key]
    const updatedFish = {...fish, [e.target.name]: e.target.value}
    updateFish(key, updatedFish)
  }

  renderInventory(key) {
    const fish = this.props.fishes[key]
    return(
      <div className='fish-edit' key={key}>
        <input type='text' name='name' value={fish.name} placeholder='Fish Name' onChange={(e) => this.handleChange(e, key)} />
        <input type='text' name='price' value={fish.price} placeholder='Price' onChange={(e) => this.handleChange(e, key)} />
        <select type='text' name='status' value={fish.status} placeholder='Fish Status' onChange={(e) => this.handleChange(e, key)} >
          <option value='available'> Fresh! </option>
          <option value='unavailable'> Sold Out! </option>
        </select>
        <textarea type='text' name='desc' value={fish.desc} placeholder='Fish Desc' onChange={(e) => this.handleChange(e, key)} />
        <input type='text' name='image' value={fish.image} placeholder='image' onChange={(e) => this.handleChange(e, key)} />
      </div>
    )
  }
  render() {
    const { fishes, addFish, loadSamples } = this.props

    return(
      <div>
        <h2> Inventory </h2>
        {Object.keys(fishes).map((key) => this.renderInventory(key))}
        <AddFishForm addFish={addFish} />
        <button onClick={loadSamples}> Load Sample Fishes </button>
      </div>
    )
  }
}

export default Inventory
