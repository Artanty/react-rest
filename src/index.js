import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

import FetchComponent from './components/FetchComponent';
import store from './store'

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <FetchComponent />
        </BrowserRouter>
    </Provider>
), document.getElementById('root'));

serviceWorker.unregister();
