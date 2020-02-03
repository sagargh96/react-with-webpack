const initialState = {
    showAccountNavModal: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
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