import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import registerServiceWorker from './registerServiceWorker'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers';
import reduxThunk from 'redux-thunk'
import { Router, Route } from 'react-router-dom'
import './styles/global.scss'

import {
    Search,
    IssuesList,
} from './pages'
import history from './history'

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <Router history={history}>
            <div>
                <Route exact path="/" component={Search} />
                <Route exact path="/issues" component={IssuesList} />
            </div>
        </Router>
    </Provider>
    , document.getElementById('root'))
registerServiceWorker()
