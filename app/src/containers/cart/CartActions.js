import { push } from 'react-router-redux';
import { createAction, converToStoreDetails } from 'utils/helpers';
import axios from 'api';
import { getCurrentUser } from 'containers/account/AccountActions';
import { redirectToLogin } from 'utils/CommonActions';

const cartRestURL = '/cart';
export const openCartModal = () => {
    return {
        type: 'OPEN_CART_MODAL'
    }
};
export const closeCartModal = () => {
    return {
        type: 'CLOSE_CART_MODAL'
    }
};
export const addItemToCart = (product, productOption) => (dispatch, getState) => {
    const storeDetails = getState().data.store.storeDetails;
    dispatch({
        type: 'UPDATE_CART_ITEM',
        product: product,
        productOption: productOption,
        store: storeDetails,
        count: 1
    });
    dispatch({
        type: 'PRODUCT_OPTION_SELECT',
        product: product,
        productOption: productOption
    });
};
export const removeItemFromCart = (product, productOption) => (dispatch, getState) => {
    const storeDetails = getState().data.store.storeDetails;
    dispatch({
        type: 'UPDATE_CART_ITEM',
        product: product,
        productOption: productOption,
        store: storeDetails,
        count: -1
    });
};
export const checkoutCart = (cart) => (dispatch, getState) => {
    const state = getState();
    dispatch(closeCartModal());
    const currentUser = getCurrentUser(state);
    if (currentUser && currentUser.isAuthenticated) {
        dispatch(push('/checkout'));
    } else {
        dispatch(redirectToLogin('/checkout'));
    }
};

const buildCartRequest = (cart, user) => {
    let cartRequest = {
        id: cart.id,
        cartStores: []
    };
    Object.keys(cart.items).forEach((storeId) => {
        let cartStoreItem = cart.items[storeId];
        let cartStore = {
            storeId: storeId,
            cartItems: []
        };
        Object.keys(cartStoreItem.products).forEach((productId) => {
            const product = cartStoreItem.products[productId];
            Object.keys(product.productOptions).forEach((productOptionId) => {
                const productOption = product.productOptions[productOptionId];
                cartStore.cartItems.push({
                    productId: productId,
                    productOptionId: productOptionId,
                    qty: productOption.count
                });
            });
        });
        cartRequest.cartStores.push(cartStore);
    });
    return cartRequest;
}

const buildCartData = (cartResponse) => {
    if (!cartResponse) {
        return null;
    }
    let cart = {
        test: 'checkedout cart',
        id: cartResponse.id,
        amount: cartResponse.amount || 0,
        items: {},
        count: 0,
        subTotal: cartResponse.subTotal,
        totalDeliveryCharges: cartResponse.shippingCharges || 0,
        packagingCharges: cartResponse.packagingCharges || 0
    };
    if (!cartResponse.cartStores) {
        return cart;
    }
    cartResponse.cartStores.forEach((cartStoreItem) => {
        let storeItem = cart.items[cartStoreItem.storeId];
        if (!storeItem) {
            storeItem = {
                storeDetails: converToStoreDetails(cartStoreItem.store),
                subTotal: cartStoreItem.amount,
                count: 0,
                deliveryChargesApplied: cartStoreItem.shippingCharges,
                packagingCharges: cartStoreItem.packagingCharges,
                products: {}
            };
            cart.items[cartStoreItem.storeId] = storeItem;
        }
        cartStoreItem.cartItems.forEach((item) => {
            storeItem.count += item.qty;
            const productOptionStore = item.productOptionStore;
            const {
                productId,
                productImgSmall
             } = productOptionStore.productOption;
            let product = storeItem.products[productId];
            if (!product) {
                product = {
                    cartId: item.id,
                    id: productId,
                    //productId: item.productId,
                    name: item.name,
                    unitQty: item.unitQty,
                    uom: item.uom,
                    imgSmall: productImgSmall,
                    productOptions:{}
                }
                storeItem.products[productId] = product;
            }
            let productOption = product.productOptions[productOptionStore.productOption.id];
            if (!productOption) {
                productOption = {
                    id: productOptionStore.productOption.id,
                    count: item.qty,
                    name: productOptionStore.productOption.name,
                    price: productOptionStore.price,
                    oldPrice: productOptionStore.oldPrice,
                    qty: productOptionStore.productOption.qty,
                    stockQty: productOptionStore.stockQty,
                    totalQty: (item.qty || 0) * (productOptionStore.productOption.qty || 0),
                    subTotal: (item.qty || 0) * (productOptionStore.price || 0)
                };
                product.productOptions[productOptionStore.productOption.id] = productOption;
            }            
            cart.count += item.qty;
        });
    });
    return cart;
}

export const saveCart = (cart, loginSuccessCBUrl) => (dispatch, getState) => {
    dispatch(createAction('SAVE_CART_INPROGRESS'));
    const currentUser = getCurrentUser(getState());
    const isNew = cart.id ? false : true;
    if (!currentUser) {
        dispatch(redirectToLogin(loginSuccessCBUrl));
        return;     
    }
    axios({
        method: isNew ? 'POST' : 'PUT',
        url: `${cartRestURL}` + (isNew ? '' : `/${cart.id}`),
        data: buildCartRequest(cart, currentUser)
    }).then((res) => {
        dispatch(createAction('SAVE_CART_SUCCESS', buildCartData(res.data.data)));
    }).catch((error) => {
        dispatch(createAction('SAVE_ADDRESS_ERROR'));
    });
}

export const clearCartData = () => {
    return createAction('CLEAR_CART');
}
