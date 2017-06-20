import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Route } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'

import history from './history'
import store from './store'

import App from './app'
import PhotoStream from './app/stream/container'

class Root extends React.Component {
  render() {
    return <Provider store={store}>
      <ConnectedRouter history={history}>
        <App>
          <Route exact path='/' component={PhotoStream} />
        </App>
      </ConnectedRouter>
    </Provider>
  }
}

render(<Root />, document.getElementById('app'))
