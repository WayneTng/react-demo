import React from 'react'

import { getFunName } from '../helpers'

class StorePicker extends React.Component {
  goToStore(event) {
    event.preventDefault()
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

export default StorePicker
