const initialState = {
    keyword: '',
    showSearchBox: false,
    results: [        
        {
            keyword: 'tomato',
            name: 'Tomato',
            category: {
                id: 1,
                name: 'Vegetables',
                imgSmall: ''
            },
        },
        {
            suggestion: {
                name: 'Tomato'
            }
        },
        {
            suggestion: {
                name: 'Tomato Red'
            }
        },
        {
            suggestion: {
                name: 'Tomato Red small'
            }
        }
    ],
    trending: [
        {
            keyword: 'onion',
            name: 'Onion',
            category: {
                id: 1,
                name: 'Vegetables',
                imgSmall: ''
            },
        },
        {
            keyword: 'tomato',
            name: 'Tomato',
            category: {
                id: 1,
                name: 'Vegetables',
                imgSmall: ''
            },
        },
        {
            keyword: 'garlic',
            name: 'Garlic',
            category: {
                id: 1,
                name: 'Vegetables',
                imgSmall: ''
            },
        }
    ],
    searchHistory: [
        {
            keyword: 'tamata',
            searchCount: 1,
            lastSearchTime: 1548068529812
        },
        {
            keyword: 'kanda',
            searchCount: 3,
            lastSearchTime: 1548068529812
        },
        {
            keyword: 'batata',
            searchCount: 2,
            lastSearchTime: 1548068529812
        },
        {
            keyword: 'garlic',
            name: 'Garlic',
            category: {
                id: 1,
                name: 'Vegetables',
                imgSmall: ''
            },
            searchCount: 2,
            lastSearchTime: 1548068529812
        },
        {
            keyword: 'tamata',
            searchCount: 1,
            lastSearchTime: 1548068529812
        },
        {
            keyword: 'kanda',
            searchCount: 3,
            lastSearchTime: 1548068529812
        },
        {
            keyword: 'batata',
            searchCount: 2,
            lastSearchTime: 1548068529812
        },
        {
            keyword: 'garlic',
            name: 'Garlic',
            category: {
                id: 1,
                name: 'Vegetables',
                imgSmall: ''
            },
            searchCount: 2,
            lastSearchTime: 1548068529812
        },
        {
            keyword: 'tamata',
            searchCount: 1,
            lastSearchTime: 1548068529812
        },
        {
            keyword: 'kanda',
            searchCount: 3,
            lastSearchTime: 1548068529812
        },
        {
            keyword: 'batata',
            searchCount: 2,
            lastSearchTime: 1548068529812
        },
        {
            keyword: 'garlic',
            name: 'Garlic',
            category: {
                id: 1,
                name: 'Vegetables',
                imgSmall: ''
            },
            searchCount: 2,
            lastSearchTime: 1548068529812
        },
        {
            keyword: 'tamata',
            searchCount: 1,
            lastSearchTime: 1548068529812
        },
        {
            keyword: 'kanda',
            searchCount: 3,
            lastSearchTime: 1548068529812
        },
        {
            keyword: 'batata',
            searchCount: 2,
            lastSearchTime: 1548068529812
        },
        {
            keyword: 'garlic',
            name: 'Garlic',
            category: {
                id: 1,
                name: 'Vegetables',
                imgSmall: ''
            },
            searchCount: 2,
            lastSearchTime: 1548068529812
        }
    ]
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_SEARCH_KEYWORD':
            return {
                ...state,
                keyword: action.payload
            };
        case 'SHOW_SEARCH_BOX':
            return {
                ...state,
                showSearchBox: true
            };
        case 'HIDE_SEARCH_BOX':
            return {
                ...state,
                showSearchBox: false
            };
        default:
            return state;
    }
};

export default reducer;