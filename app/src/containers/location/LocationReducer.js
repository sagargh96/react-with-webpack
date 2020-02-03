import { defaultRegion } from './Constants';

const initialState = {
   ...defaultRegion,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_LOCATION':
            return {
                isDefault: action.payload.isDefault || false,
                id: action.payload.id,
                lat: action.payload.latitude,
                lon: action.payload.longitude,
                locality: action.payload.name,
                city: action.payload.city,
                zipCode: action.payload.zipCode,
                isAvailable: true
            };
        // case 'persist/REHYDRATE':
        //     const persistState = action.payload && action.payload.location || {};
        //     return {
        //         ...state,
        //         ...persistState
        //     }
        case 'SELECT_DEFAULT_LOCATION': 
            return {
                ...state,
                isDefault: false   
            };
        default:
            return state;
    }
};

export default reducer;