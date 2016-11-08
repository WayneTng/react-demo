import React from 'react'
import { formatPrice } from '../helpers'

class Fish extends React.Component {
  render() {
    const { name, image, price, desc, status } = this.props.details
    const { addToOrder, index } = this.props
    const isAvailable = status === 'available'
    const buttonText = isAvailable ? 'Add To Order' : 'Sold Out!'

    return (
      <li className='menu-fish'>
        <img src={image} alt={image} />
        <h3 className='fish-name'>
          {name}
          <span className='price'> {formatPrice(price)} </span>
        </h3>
        <p> {desc} </p>
        <button onClick={() => addToOrder(index)} disabled={!isAvailable}> {buttonText} </button>
      </li>
    )
  }
}

Fish.propTypes = {
  details: React.PropTypes.object.isRequired
}

export default Fish
