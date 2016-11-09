import React from 'react'

export const withRouter = (Component) => {
  class WithRouterClass extends React.Component {
    render() {
      const router = this.context.router
      return <Component router={router} />
    }
  }

  WithRouterClass.contextTypes = {
    router: React.PropTypes.object
  }

  return WithRouterClass
}
