import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Match, Miss } from 'react-router'

import './assets/css/style.css'
import Main from './pages/Main'
import StorePicker from './pages/StorePicker'
import NotFound from './pages/NotFound'

const Root = () => {
  return (
    <BrowserRouter>
      <div>
        <Match exactly pattern='/' component={StorePicker}/>
        <Match pattern='/store/:storeId' component={Main}/>
        <Miss component={NotFound} />
      </div>
    </BrowserRouter>
  )
}

render(<Root />, document.querySelector('#main'))
