import axios from 'api';
import { createAction } from 'utils/helpers';
import { push } from 'react-router-redux';

const authRestURL = '/auth';
const storeHome = '/store';

export const openAccountWidget = () => {
    return {
        type: 'OPEN_ACCOUNT_WIDGET'
    }
};
export const closeAccountWidget = () => {
    return {
        type: 'CLOSE_ACCOUNT_WIDGET'
    }
};

export const changeSignUpStep = (step) => {
    return {
        type: 'CHANGE_SIGNUP_STEP',
        step: step
    }
};

export const shopNowClick = () => (dispatch) => {
    dispatch(createAction('CLOSE_ACCOUNT_WIDGET'));
}

export const signInToAccount = ({ emailId, password }, redirectUrl) => (dispatch) => {
    dispatch({ type: 'SIGNIN_INPROGESS' });
    axios.post(`${authRestURL}/signin/`, { phoneNumberOrEmailId: emailId, password })
        .then((res) => {
            dispatch(createAction('SIGNIN_SUCCESS', res.data.data));
            dispatch(createAction('SET_TOKEN_IN_CONTEXT', res.data.data));              
            dispatch(push(redirectUrl));
        }).catch ((error) => {
            dispatch(createAction('SIGNIN_ERROR', error.response.data.data.errorMsg));
        });
};

export const signUpAccount = (signUpForm, redirectUrl) => (dispatch, getState) => {
    dispatch({ type: 'SIGNUP_INPROGESS' });
    //Set selected zipCode in signUp form
    const selectedZipCode = getState().data.location.zipCode;
    signUpForm.zipCode = selectedZipCode;
    axios.post(`${authRestURL}/signup/`, signUpForm)
        .then((res) => {
            dispatch(createAction('SIGNUP_SUCCESS', res.data.data));
            dispatch(createAction('SET_TOKEN_IN_CONTEXT', res.data.data));             
            dispatch(push(redirectUrl));
        }).catch ((error) => {
            dispatch(createAction('SIGNUP_ERROR', error.response.data.data));
        });
};

export const redirectToStoreHome = () => (dispatch, getState) => {             
    dispatch(push(storeHome));
}