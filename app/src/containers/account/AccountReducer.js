const initialState = {
    isAuthenticated: false
};

const _setAuthTokenInContext = (state, token) => {
    if (!token) {
        return {
            ...state
        };
    }
    localStorage.setItem('authToken', token);
    return {
        ...state,
        isAuthenticated: true,
        signInStatus: 'success'
    };
}

const _invalidateAuthToken = (state) => {
    localStorage.removeItem('authToken');
    return {
        ...state,
        isAuthenticated: false,
        signInStatus: 'invalid_token'
    }; 
}

const _setAccountInContext = (state, user) => {
    if (!user) {
        return {
            ...state,
        };
    }
    return {
        ...state,
        ...user
    };    
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_TOKEN_IN_CONTEXT':
            return _setAuthTokenInContext(state, action.payload.accessToken);
        case 'SIGNUP_ACCOUNT':
            return {
                ...state
            };
        case 'USER_CONTEXT_LOADED':
            return _setAccountInContext(state, action.payload);
        case 'INVALID_AUTH_TOKEN':
            return _invalidateAuthToken(state);
        case 'OPEN_MY_ACCOUNT_MODAL':
            return {
                ...state,
                showAccountNavModal: true
            };
        case 'CLOSE_MY_ACCOUNT_MODAL':
            return {
                ...state,
                showAccountNavModal: false
            };
        default:
            return state;
    }
};

export default reducer;