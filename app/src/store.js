import { createStore, compose, applyMiddleware } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { routerMiddleware } from 'react-router-redux'
import { push } from 'react-router-redux';
import thunk from 'redux-thunk';
import { responsiveStoreEnhancer } from 'redux-responsive';
import createLogger from 'redux-logger';
import { persistStore } from 'redux-persist';
import { browserHistory } from 'react-router';
import promiseMiddleware from 'redux-promise-middleware';
import rootReducer from './reducers';
import axios from 'api';
import { createAction } from 'utils/helpers';

/* Commonly used middlewares and enhancers */
/* See: http://redux.js.org/docs/advanced/Middleware.html*/
const loggerMiddleware = createLogger();
const routerHistoryMiddleware = routerMiddleware(browserHistory);
const middlewares = [thunk, promiseMiddleware(), routerHistoryMiddleware, loggerMiddleware];

/* Everyone should use redux dev tools */
/* https://github.com/gaearon/redux-devtools */
/* https://medium.com/@meagle/understanding-87566abcfb7a */
const enhancers = [];
const devToolsExtension = window.devToolsExtension;
if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
}
enhancers.push(responsiveStoreEnhancer);

const getInitialStoreData = () => {
    return {
        data: {
            paymentTxn: JSON.parse(window.paymentTxnData ? 
                window.paymentTxnData.replace(/&#34;/g, '"').replace(/</g, '\\u003c') : "{}")
        }
    };
};

const composedEnhancers = compose(
    applyMiddleware(...middlewares),
    ...enhancers
);

const initialStoreData = getInitialStoreData();
const store = createStore(
    rootReducer,
    initialStoreData,
    composedEnhancers
);
let persistor = persistStore(store);
export const history = syncHistoryWithStore(browserHistory, store);

/* Hot reloading of reducers.  How futuristic!! */
if (module.hot) {
    module.hot.accept('./reducers', () => {
        /*eslint-disable */ // Allow require
        const nextRootReducer = require('./reducers').default;
        /*eslint-enable */
        store.replaceReducer(nextRootReducer);
    });
}

//Called from the child window opened for social login after social login is successful
window.socialLoginSuccessful = (token) => {
    if (!token) {
        return;
    }
    
    store.dispatch(createAction('SIGNIN_SUCCESS', {
        accessToken: token
    }));
    store.dispatch(createAction('SET_TOKEN_IN_CONTEXT', {
        accessToken: token
    }));

    axios.get(`auth/context`)
        .then((res) => {            
            store.dispatch({
                type: 'ACCOUNT_CONTEXT_LOADED',
                user: res.data.data
            });                        
            store.dispatch(push('/store'));
        }).catch((error) => {
            store.dispatch({
                type: 'INVALID_AUTH_TOKEN',
                error: 'Invliad auth token'
            });
        });
}

export default store;