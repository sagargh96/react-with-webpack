import axios from 'api';

export const updateProductSelectedQty = (productId, selectedQty) => (dispatch) => {
    dispatch({
        type: 'UPDATE_PRODUCT_SELECTED_QTY',
        productId: productId,
        selectedQty: selectedQty
    });
}

export const fetchProducts = (selectedCategory, selectedSubCategory) => (dispatch, getState) => {
    const storeDetails = getState().data.store.storeDetails;
    if (!storeDetails || !selectedCategory || !selectedSubCategory) {
        return;
    }
    const storeId = storeDetails.id;
    const categoryId = selectedSubCategory.id;
    dispatch({type: 'FETCH_PRODUCTS_INPROGRESS'});
    axios.get(`/catalog/products/stores/${storeId}/categories/${categoryId}?page=0&size=3`)
        .then((res) => {
            if (res.status === 200 && res.data) {
                dispatch({
                    type: 'FETCH_PRODUCTS_SUCCESS',
                    data: res.data.data
                });
            }
        });
};

export const productOptionModalOpen = (productId) => (dispatch) => {
    dispatch({
        type: 'PRODUCT_OPTION_MODAL_OPEN',
        selectedProductId: productId
    });
}

export const productOptionModalClose = () => (dispatch) => {
    dispatch({
        type: 'PRODUCT_OPTION_MODAL_CLOSE'
    });
}

export const selectDefaultProductOption = (product, productOption) => (dispatch) => {
    dispatch({
        type: 'PRODUCT_OPTION_SELECT',
        product: product,
        productOption: productOption
    });
}