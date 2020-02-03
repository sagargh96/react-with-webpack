const initialState = {
    miniHeaderMode: false
 };
 
 const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ENABLE_MINI_HEADER':
            return {
                ...state,
                miniHeaderMode: true
            };
        case 'DISABLE_MINI_HEADER':
            return {
                ...state,
                miniHeaderMode: false
            };
        default:
            return state;
    }
};

export default reducer;