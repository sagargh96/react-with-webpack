export const updateProductSelectedQty = (productId, selectedQty) => (dispatch) => {
    dispatch({
        type: 'UPDATE_PRODUCT_DETAIL_SELECTED_QTY',
        productId: productId,
        selectedQty: selectedQty
    });
}

export const selectProductSubCategory = (selectedCategory, selectedSubCategory) => {
    return {
        type: 'SELECT_PRODUCT_SUB_CATEGORY',
        selectedCategory: selectedCategory,
        selectedSubCategory: selectedSubCategory
    }
}