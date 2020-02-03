const initialState = {
    selectedProductId: null,
    productOptionModalIsOpen: false,
    products: []
}

const updateProductSelectedQty = (productsState, productId, selectedQty) => {
    const newProductsState = {
        ...productsState
    }
    for (let i = 0; i < newProductsState.products.length; i++) {
        let product = newProductsState.products[i];
        if (product.id === productId) {
            let newProduct = {
                ...product
            }
            newProduct.selectedQty = {
                ...selectedQty
            }
            newProductsState.products[i] = newProduct;
            return newProductsState;
        }
    }
}

const updateSelectedProductOption = (products, product, productOption) => {
    return products.map(p => {
        if (p.id === product.id) {
            return {
                ...p,
                selectedProductOptionId:  productOption.id
            };
        }
        return p;
    });
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'UPDATE_PRODUCT_SELECTED_QTY':
            const newProductsState = updateProductSelectedQty(state, action.productId, action.selectedQty);
            return {
                ...newProductsState
            }
        case 'SELECT_PRODUCT_SUB_CATEGORY': 
            return {
                ...state,
                selectedProductSubCat: action.selectedSubCategory
            }
        case 'FETCH_PRODUCTS_SUCCESS': 
            return {
                ...state,
                products: action.data
            }
        case 'PRODUCT_OPTION_MODAL_OPEN':
            return {
                ...state,
                selectedProductId: action.selectedProductId,
                productOptionModalIsOpen: true
            } 
        case 'PRODUCT_OPTION_MODAL_CLOSE':
            return {
                ...state,
                selectedProductId: null,
                productOptionModalIsOpen: false
            }
        case 'PRODUCT_OPTION_SELECT':
            return {
                ...state,
                products: updateSelectedProductOption(state.products, action.product, action.productOption)
            }
        default:
            return state;
    }
};

export default reducer;