const cartUi = (state = {isModalOpen: false}, action) => {
	switch (action.type) {
        case 'OPEN_CART_MODAL':
            return {
                ...state,
                isModalOpen: true
            }
        case 'CLOSE_CART_MODAL':
            return {
                ...state,
                isModalOpen: false
			}
		default:
			return state
	}
};

export default cartUi;