import React from 'react'

function log(target, name, descriptor) {
  console.log({
    target, // instance of the class
    name, // name of the decorated function
    descriptor // contains the function
  })
}

class StorePicker extends React.Component {
  @log renderMe() {
    return <h1>Hello, world!</h1>
  }

  render() {
    return (
      <div>
        {this.renderMe()}
      </div>
    )
  }
}

export default StorePicker
