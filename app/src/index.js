import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store';
import routes from './routes';

render(
    <Provider store={store}>
        <Router routes={routes} history={history} />
    </Provider>, 
    document.getElementById('app')
);