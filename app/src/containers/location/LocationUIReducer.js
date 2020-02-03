const initialState = {
    showModal: false
 };
 
 const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'OPEN_LOCATION_MODAL':
            return {
                ...state,
                showModal: true
            };
        case 'CLOSE_LOCATION_MODAL':
            return {
                ...state,
                showModal: false,
                checkZipCodeStatus: ''
            };
            case 'CHECK_ZIPCODE_INPROGRESS':
            return {
                ...state,
                checkZipCodeStatus: 'inProgress'
            };
        case 'CHECK_ZIPCODE_SUCCESS':
            return {
                ...state,
                checkZipCodeStatus: 'success',
                error: action.data.error,
                zipCode: action.data.zipCode
            };
        case 'CHECK_ZIPCODE_ERROR':
            return {
                ...state,
                checkZipCodeStatus: 'error',
                error: action.data.error,
                zipCode: action.data.zipCode
            };
        default:
            return state;
    }
};

export default reducer;