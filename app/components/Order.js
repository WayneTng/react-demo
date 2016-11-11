import React from 'react'
import {formatPrice} from '../lib/helpers'
import CSSTransitionGroup from 'react-addons-css-transition-group'
import Timer from './Timer'
import { observer } from 'mobx-react'
import orderStore from '../stores/Order'
import fishStore from '../stores/Fish'

@observer class Order extends React.Component {
  componentWillMount() {
    const { storeId } = this.props
    this.store = orderStore.getStore(storeId)
    this.fishStore = fishStore.getStore(storeId)
  }

  renderOrder(key) {
    const fish = this.fishStore.fishes[key]
    const count = this.store.order[key]
    const removeButton = <button onClick={() => this.store.removeFromOrder(key)}>&times;</button>

    if (!fish || fish.status === 'unavailable') {
      return <li key={key}>Sorry, Fish is no longer available! {removeButton}</li>
    }

    return (
      <li key={key}>
        <span>
          <CSSTransitionGroup
            component="span"
            className="count"
            transitionName="count"
            transitionEnterTimeout={250}
            transitionLeaveTimeout={250}
          >
            <span key={count}>{count}</span>
          </CSSTransitionGroup>

          lbs {fish.name} {removeButton}
        </span>
        <span className='price'> {formatPrice(count * fish.price)} </span>
      </li>
    )
  }

  render() {
    const orderIds = Object.keys(this.store.order)
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = this.fishStore.fishes[key]
      const count = this.store.order[key]
      const isAvailable = fish && fish.status === 'available'
      if (isAvailable) {
        return prevTotal + (count * fish.price || 0)
      }
      return prevTotal
    }, 0)

    return(
      <div className='order-wrap'>
        <h2> Your Order </h2>
        <ul className='order'>
          {orderIds.map((key) => this.renderOrder(key))}
          <li className='total'>
            <strong> Total: </strong>
            {formatPrice(total)}
          </li>
        </ul>
        <Timer />
      </div>
    )
  }
}

Order.propTypes = {
  storeId: React.PropTypes.string.isRequired
}

export default Order
