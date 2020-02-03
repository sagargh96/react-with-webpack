const initialState = {
    isLoadComplete: false,
    showAnimatedTick: false
};

const orderConfirmationData = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_CONFIRMED_ORDER_SUCCESS':
            return {
                ...action.payload,
                isLoadComplete: true 
            };
        case 'SHOW_ANIMATED_TICK':
            return {
                ...state,
                showAnimatedTick: true
            }
        default:
            return state;
    }
};

export default orderConfirmationData;