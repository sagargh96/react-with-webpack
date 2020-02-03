const initialState = {
    formType: 'SIGN_IN',
    showSignUpModal: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'OPEN_ACCOUNT_WIDGET':
            return {
                ...state,
                formType: 'SIGN_IN',
                showSignUpModal: true
            };
        case 'CLOSE_ACCOUNT_WIDGET':
            return {
                ...state,
                formType: '',
                showSignUpModal: false
            };
        case 'CHANGE_SIGNUP_STEP':
            return {
                ...state,
                step: action.step
            };
        case 'CHECK_ZIPCODE_SUCCESS':
            return {
                ...state,
                step: 'SIGN_UP'
            };
        case 'CHECK_ZIPCODE_ERROR':
            return {
                ...state,
                step: 'SIGN_UP'
            };
        case 'SIGNIN_INPROGESS':
            return {
                ...state,
                signInStatus: 'inProgress'
            };
        case 'SIGNIN_SUCCESS':
            return {
                ...state,
                signInStatus: 'success'
            };
        case 'SIGNUP_SUCCESS':
            return {
                ...state,
                signUpStatus: 'success'
            };
        case 'SIGNIN_ERROR':
            return {
                ...state,
                signInStatus: 'error',
                signInErrorMsg: action.payload.errorMsg
            };
        case 'SIGNUP_ERROR':
            return {
                ...state,
                signUpStatus: 'error',
                signUpErrorMsg: action.payload.errorMsg
            };
        default:
            return state;
    }
};

export default reducer;