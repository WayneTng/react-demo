import React from 'react'
import {formatPrice} from '../helpers'
import CSSTransitionGroup from 'react-addons-css-transition-group'
import Timer from './Timer'
import { observer } from 'mobx-react'
import orderStoreFactory from '../stores/Order'

@observer class Order extends React.Component {
  componentWillMount() {
    this.store = orderStoreFactory.getStore(this.props.storeId)
  }

  renderOrder(key) {
    const { fishes } = this.props
    const fish = fishes[key]
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
    const { fishes } = this.props
    const orderIds = Object.keys(this.store.order)
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = fishes[key]
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
        <CSSTransitionGroup
          className='order'
          component='ul'
          transitionName='order'
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
          >
          {orderIds.map((key) => this.renderOrder(key))}
          <li className='total'>
            <strong> Total: </strong>
            {formatPrice(total)}
          </li>
        </CSSTransitionGroup>
        <Timer />
      </div>
    )
  }
}

Order.propTypes = {
  fishes: React.PropTypes.object.isRequired
}

export default Order
