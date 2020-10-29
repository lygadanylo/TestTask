import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { StoreConfiguration } from './scripts/redux/storeConfiguration';
import App from './App';

ReactDOM.render(
    <Provider store={StoreConfiguration()}>
        <App />
    </Provider>,
    document.getElementById('root')
);
