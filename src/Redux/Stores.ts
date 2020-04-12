import { createStore, applyMiddleware, compose } from 'redux'
import chatchitReducers, { history } from './ChatchitReducers';
import { routerMiddleware } from 'connected-react-router'

let initState = {
    leftSide: {
        contacts: []
    },
    chatWindow: {
        chatHistories: [],
        contactInfo: {}
    },
    contacts: [],
    authorize: {
        userProfile: {}
    }
}

const store = createStore(chatchitReducers, initState, compose(
    applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        // ... other middlewares ...
    ),
));

export default store;