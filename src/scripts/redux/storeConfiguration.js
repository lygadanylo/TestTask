import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import reducer from './reducer';

export const StoreConfiguration = () => {
    const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk, logger)));
    return store;
};
