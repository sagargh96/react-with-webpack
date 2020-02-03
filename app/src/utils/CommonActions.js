
import { push } from 'react-router-redux';

const loginURL = '/auth/login?redirectUrl=';
const _redirectTo = (dispatch, path) => {
    dispatch(push(path))
}

export const redirectToLogin = (successCBUrl) => {
    return (dispatch, getState) => {
        _redirectTo(dispatch, loginURL + successCBUrl);
    }
}

export const redirectToHome = () => {
    return (dispatch, getState) => {
        _redirectTo(dispatch, '/store');
    }
}

export const redirectToMyOrders = () => {
    return (dispatch, getState) => {
        _redirectTo(dispatch, '/account/my-orders');
    }
}

export const redirectToOrderConfirmation = () => {
    return (dispatch, getState) => {
        _redirectTo(dispatch, '/order-confirmation');
    }
}
