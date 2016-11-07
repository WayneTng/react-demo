import React from 'react'

class StorePicker extends React.Component {
  render() {
    return (
      <div>
        <form className='store-selector'>
          <h2> Please enter a store </h2>
          <input type='text' required={true} placeholder='Store Name' />
          <button type='submit'>
            Visit Store
          </button>
        </form>
      </div>
    )
  }
}

export default StorePicker
