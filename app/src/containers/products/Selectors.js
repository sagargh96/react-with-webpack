import isEqual from 'lodash.isequal';
import { createSelector, createSelectorCreator, defaultMemoize } from 'reselect';

const getProps = (state, props) => (props);

const getSelectedProductId = (state, props) => {
    return state.ui.products.selectedProductId;
};

export const makeGetProductOptionModalIsOpen = () => createSelector(
    [
        getSelectedProductId,
        getProps
    ],
    (selectedProductId, { productId }) => {
        return selectedProductId === productId;
    }
)

export const getProductOptionModalIsOpen = createSelector(
    [
        getSelectedProductId,
        getProps
    ],
    (selectedProductId, { productId }) => {
        return selectedProductId === productId;
    }
)