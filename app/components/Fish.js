import React from 'react'
import { formatPrice } from '../lib/helpers'
import orderStore from '../stores/Order'
import { observer } from 'mobx-react'

@observer class Fish extends React.Component {
  render() {
    const { name, image, price, desc, status } = this.props.details
    const { index, storeId } = this.props
    const isAvailable = status === 'available'
    const buttonText = isAvailable ? 'Add To Order' : 'Sold Out!'
    const store = orderStore.getStore(storeId)

    return (
      <li className='menu-fish'>
        <img src={image} alt={image} />
        <h3 className='fish-name'>
          {name}
          <span className='price'> {formatPrice(price)} </span>
        </h3>
        <p> {desc} </p>
        <button onClick={() => store.addToOrder(index)} disabled={!isAvailable}> {buttonText} </button>
      </li>
    )
  }
}

Fish.propTypes = {
  details: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    image: React.PropTypes.string.isRequired,
    price: React.PropTypes.number.isRequired,
    desc: React.PropTypes.string.isRequired,
    status: React.PropTypes.string.isRequired
  }),
  storeId: React.PropTypes.string.isRequired,
  index: React.PropTypes.string.isRequired
}

export default Fish
