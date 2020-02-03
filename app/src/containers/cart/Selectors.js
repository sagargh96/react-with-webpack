import isEqual from 'lodash.isequal';
import { createSelector, createSelectorCreator, defaultMemoize } from 'reselect';
import { getStoreDetails } from 'containers/store/Selectors'

const getProps = (state, props) => (props);

const createCartSelector = createSelectorCreator(
    defaultMemoize,
    isEqual
);

// export const getCart = createCartSelector(
//     state => state.data.cart,
//     cart => cart
// );

export const getCart = state => state.data.cart;

export const makeGetProductOptionInCart = () => {
    return getProductOptionInCart;
};

export const getProductOptionInCart = createSelector(
        [
            getCart,
            getStoreDetails,
            getProps
        ],
        (cart, storeDetails, { productOptionId }) => {
            console.log('getProductOptionInCart');
            if (!(productOptionId && storeDetails && storeDetails.id && cart.items[storeDetails.id])) {
                return null;
            }
            return cart.items[storeDetails.id].products[productOptionId];
        }
    )



export const makeGetProductOptionsInCartByProductId = () => {
    return getProductOptionsInCartByProductId;
};

export const getProductOptionsInCartByProductId = createSelector(
    [
        getCart,
        getStoreDetails,
        getProps
    ],
    (cart, storeDetails, { productId }) => {
        console.log('getProductOptionsInCartByProductId');
        if ((!storeDetails && !storeDetails.id) || (!cart.items || cart.items.length <= 0)) {
            return null;
        }

        const cartItems = Object.values(cart.items[storeDetails.id].products).filter((item) => {
            return item.details.id === productId;
        });
        return cartItems;
    }
)