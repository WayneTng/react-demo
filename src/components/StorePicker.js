import React from 'react'

import { getFunName } from '../helpers'

class StorePicker extends React.Component {
  goToStore(event) {
    event.preventDefault()
    const storeId = this.storeInput.value
    this.context.router.transitionTo(`/store/${storeId}`)
  }

  render() {
    return (
      <div>
        <form className='store-selector' onSubmit={(e) => this.goToStore(e)}>
          <h2> Please enter a store </h2>
          <input ref={(input) => {this.storeInput = input} } type='text' required={true} placeholder='Store Name' defaultValue={getFunName()} />
          <button type='submit'>
            Visit Store
          </button>
        </form>
      </div>
    )
  }
}

StorePicker.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default StorePicker
