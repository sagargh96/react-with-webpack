const initialState = {
};

const paymentTxnData = (state = initialState, action) => {
    switch (action.type) {
        case 'CLEAR_CHECKOUT_DATA':
            return initialState;
        case 'HANDLE_PAYUMONEY_PAYMENT_RESPONSE':
            return {
                ...action.payload
            };
        default:
            return state;
    }
};

export default paymentTxnData;