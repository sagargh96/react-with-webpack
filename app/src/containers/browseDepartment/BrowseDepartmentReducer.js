const initialState = {
    showModal: false,
    selectedCategory: null,
    selectedSubCategory: null,
    selectedCatIndex: 0
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'OPEN_DEPARTMENT_MODAL':
            return {
                ...state,
                showModal: true
            };
        case 'CLOSE_DEPARTMENT_MODAL':
            return {
                ...state,
                showModal: false
            };
        case 'SELECT_CATEGORY':
        case 'SET_SELECTED_CAT_AND_SUBCAT':
            return {
                ...state,
                selectedCategory: {
                    ...action.data.selectedCategory
                },
                selectedSubCategory: {
                    ...action.data.selectedSubCategory
                },
                selectedCatIndex: action.data.selectedCatIndex
            }
        case 'SET_SELECTED_CAT_INDEX':
            return {
                ...state,
                selectedCatIndex: action.data.selectedCatIndex
            }
        default:
        return state;
    }
}

export default reducer;