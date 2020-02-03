export const openDepartmentModal = () => {
    return {
        type: 'OPEN_DEPARTMENT_MODAL'
    }
};

export const closeDepartmentModal = () => {
    return {
        type: 'CLOSE_DEPARTMENT_MODAL'
    }
};

const _getSelectedCatAndSubCat = (categories, selectedCatName, selectedSubCatName) => {
    
	const selectedCatIndex = categories.findIndex((category) => (
        category.seoName === selectedCatName
    ));
    const selectedCat = categories[selectedCatIndex > -1 ? selectedCatIndex : 0];
    let selectedSubCat = selectedCat.subCategories.find((subCategory)=>(
        subCategory.seoName === selectedSubCatName
    ));
    selectedSubCat = selectedSubCat || selectedCat.subCategories[0];
    return {
        selectedCategory: selectedCat,
        selectedSubCategory: selectedSubCat,
        selectedCatIndex: selectedCatIndex
    }
};

export const setSelectedCatAndSubCat = (selectedCatName, selectedSubCatName) => (dispatch, getState) => {
    const categories = getState().data.store.categories;
    if (!categories) {
        return;
    }
	const selectedCatAndSubCat = _getSelectedCatAndSubCat(categories, selectedCatName, selectedSubCatName);
    dispatch({
        type: 'SET_SELECTED_CAT_AND_SUBCAT',
        data: {
            ...selectedCatAndSubCat
        }
    });
    dispatch(closeDepartmentModal());
};

export const setSelectedCategoryIndex = (selectedCatName, selectedSubCatName) => (dispatch, getState) => {
        const selectedCatIndex = getState().data.store.categories.findIndex((category) => (
            category.seoName === selectedCatName
        ));
        dispatch(setSelectedCatAndSubCat(selectedCatName, selectedSubCatName));
        dispatch({
            type: 'SET_SELECTED_CAT_INDEX',
            data: {
                selectedCatIndex: selectedCatIndex
            }
        });
};

export const selectProductSubCategory = (selectedCategory, selectedSubCategory) => (dispatch) => {
    dispatch(setSelectedCatAndSubCat);
    dispatch(closeDepartmentModal);
};