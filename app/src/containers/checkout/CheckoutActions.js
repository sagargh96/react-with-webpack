import axios from 'api';
import _get from 'lodash.get';

import { createAction } from 'utils/helpers';
import { checkoutStepKeys, paytmConfig } from './Constants';
import { getCurrentUser } from 'containers/account/AccountActions';
import { redirectToLogin, redirectToHome, redirectToOrderConfirmation } from 'utils/CommonActions';
import { saveCart } from 'containers/cart/CartActions';
import { getUserContext } from 'containers/account/AccountActions';
import { paymentOptionsConst } from './Constants';

const userRestURL = '/user';
const checkoutPage = '/checkout';
const storeRestUrl = '/stores';

export const initChckoutFlow = () => (dispatch, getState) => {
    const state = getState().data;
    const cart = state.cart;
    if (!cart || cart.count <= 0) {
        dispatch(redirectToHome());
        return;
    }
    //Passing true to not load store context
    dispatch(getUserContext(true)).then(() => {
        const currentUser = getState().data.account;
        if (!currentUser) {
            dispatch(redirectToLogin(checkoutPage));
            return;
        }
        //Set user details step
        dispatch(createAction('SET_USER_DETAILS', {...currentUser}));
        //Create or Update cart
        dispatch(saveCart(cart, '/checkout'));
        //Goto delivery address checkout step
        dispatch(gotoCheckoutStep(checkoutStepKeys.deliveryAddress));
    });
};

export const clearCheckoutData = () => {
    return createAction('CLEAR_CHECKOUT_DATA');
}

export const gotoNextCheckoutStep = (currentStepKey) => (dispatch, getState) => {
    const checkoutSteps = _get(getState(), 'ui.checkout.checkoutSteps');
    if (!checkoutSteps) {
        return;
    }
    const currentCheckoutStep = 
        checkoutSteps.find((checkoutStep) => currentStepKey === checkoutStep.key);
    const nextCheckoutStep = 
        checkoutSteps.find((checkoutStep) => checkoutStep.number === currentCheckoutStep.number + 1);
    dispatch(createAction('SET_ACTIVE_STEP', 
            {
                ...nextCheckoutStep, 
                completedStepKey: currentCheckoutStep.key
            }));
    if (nextCheckoutStep.key === checkoutStepKeys.deliverySlot) {
        dispatch(loadDeliverySlots());
    } else if (nextCheckoutStep.key === checkoutStepKeys.paymentMethod) {
        dispatch(loadPaymentOptions());
    }
};

export const gotoCheckoutStep = (stepKey) => (dispatch, getState) => {
    const checkoutSteps = _get(getState(), 'ui.checkout.checkoutSteps');
    const checkoutStep = 
        checkoutSteps.find((checkoutStep) => stepKey === checkoutStep.key);
    dispatch(createAction('SET_ACTIVE_STEP', checkoutStep));
};

//Delivery address step actions
export const getSelectedAddress = (addresses, selectedAddressId) => {
    if (!addresses || !selectedAddressId) {
        return null;
    }
    return addresses.find((address) => {
        return address.id === selectedAddressId;
    });
}

export const loadAddresses = () => (dispatch, getState) => {
    dispatch(createAction('LOAD_ADDRESSES_INPROGRESS'));
    const currentUser = getCurrentUser(getState());
    if (!currentUser) {
        dispatch(redirectToLogin(checkoutPage));
        return;     
    }
    axios.get(`${userRestURL}/${currentUser.id}/address`)
        .then((res) => {
            dispatch(createAction('LOAD_ADDRESSES_SUCCESS', res.data.data));
        }).catch((error) => {
            dispatch(createAction('LOAD_ADDRESSES_ERROR'));
        });
};

export const setDeliveryAddress = (selectedAddress) => (dispatch, getState) => {
    const state = getState();
    const selectedLocation = state.data.location;
    const activeStep = state.ui.checkout && state.ui.checkout.activeStep;
    const cart = getState().data.cart;
    if (!selectedLocation || !cart) {
        return Promise.reject();
    }
    dispatch(createAction('SET_DELIVERY_ADDRESS', {address: selectedAddress}));
    dispatch(gotoNextCheckoutStep(activeStep.key));
};

export const addNewDeliveryAddress = () => (dispatch, getState) => {
    dispatch(createAction('SHOW_DELIVERY_ADDRESS_FORM'));
    dispatch(createAction('SET_DELIVERY_ADDRESS', {address: {}}));
};

export const editDeliveryAddress = (deliveryAddress) => (dispatch, getState) => {
    dispatch(createAction('SHOW_DELIVERY_ADDRESS_FORM'));
    dispatch(createAction('SET_DELIVERY_ADDRESS', {address: deliveryAddress}));
};

export const cancelDeliveryAddress = (deliveryAddress) => (dispatch, getState) => {
    dispatch(createAction('HIDE_DELIVERY_ADDRESS_FORM'));
    dispatch(createAction('SET_DELIVERY_ADDRESS', {address: null}));
};

export const saveDeliveryAddress = (deliveryAddressForm, addressId) => (dispatch, getState) => {
    dispatch(createAction('SAVE_ADDRESS_INPROGRESS'));
    const currentUser = getCurrentUser(getState());
    const isNew = addressId ? false : true;
    if (!currentUser) {
        dispatch(redirectToLogin(checkoutPage));
        return;     
    }
    axios({
        method: isNew ? 'POST' : 'PUT',
        url: isNew ? `${userRestURL}/${currentUser.id}/address` :
            `${userRestURL}/${currentUser.id}/address/${addressId}`,
        data: deliveryAddressForm
    }).then((res) => {
        dispatch(createAction('SAVE_ADDRESS_SUCCESS', res.data.data));
        dispatch(createAction('HIDE_DELIVERY_ADDRESS_FORM'));
        dispatch(setDeliveryAddress(res.data.data));
    }).catch((error) => {
        dispatch(createAction('SAVE_ADDRESS_ERROR'));
    });
};

export const deleteDeliveryAddress = (addressId) => (dispatch, getState) => {
    dispatch(createAction('DELETE_ADDRESS_INPROGRESS'));
    const currentUser = getCurrentUser(getState());
    const isNew = addressId ? false : true;
    if (!currentUser) {
        dispatch(redirectToLogin(checkoutPage));
        return;     
    }
    axios({
        method: 'DELETE',
        url: `${userRestURL}/${currentUser.id}/address/${addressId}`
    }).then((res) => {
        dispatch(createAction('DELETE_ADDRESS_SUCCESS', {id: addressId}));
    }).catch((error) => {
        dispatch(createAction('DELETE_ADDRESS_ERROR'));
    });
};

//Delivery slots step action
export const loadDeliverySlots = () => (dispatch, getState) => {
    const state = getState();
    const deliveryAddressStep = _get(state, 'data.checkout.deliveryAddress');
    const addresses = _get(deliveryAddressStep, 'addresses');
    const selectedAddressId = _get(deliveryAddressStep, 'selectedAddressId');
    const selectedAddress = getSelectedAddress(addresses, selectedAddressId);
    const cartStoreItems = _get(state, 'data.cart.items');
    const cartStoreIds = Object.keys(cartStoreItems);
    if (!selectedAddress || !cartStoreItems || cartStoreIds.length <= 0) {
        return;
    }
    dispatch(createAction('LOAD_DELIVERY_SLOTS_INPROGRESS'));
    axios.get(`${storeRestUrl}/${cartStoreIds[0]}/regions/${selectedAddress.region.id}/delivery-slots`)
        .then((res) => {
            const deliveryTimeSlots = res.data.data;
            dispatch(createAction('LOAD_DELIVERY_SLOTS_SUCCESS', deliveryTimeSlots));
            dispatch(setDeliveryTimeSlot({
                day: deliveryTimeSlots[0].day,
                month: deliveryTimeSlots[0].month,
                date: deliveryTimeSlots[0].date,
                weekDayText: deliveryTimeSlots[0].weekDayText,
                ...deliveryTimeSlots[0].timeSlots[0]
            }));
        }).catch((error) => {
            dispatch(createAction('LOAD_DELIVERY_SLOTS_ERROR'));
        });
}

export const setDeliveryTimeSlot = (selectedDeliverySlot) => (dispatch, getState) => {
    const state = getState();
    const selectedLocation = _get(state, 'data.location');
    const cart = _get(state, 'data.cart');
    const selectedDeliveryAddress = _get(state, 'data.checkout.deliveryAddress.selectedAddressId');
    if (!selectedLocation || !cart || !selectedDeliveryAddress) {
        return Promise.reject();
    }    
    dispatch(createAction('SET_DELIVERY_TIME_SLOT', {deliverySlot: selectedDeliverySlot}));
}

//Payment Method actions
export const loadPaymentOptions = () => (dispatch, getState) => {
    dispatch(createAction('LOAD_PAYMENT_OPTIONS_INPROGRESS'));
    axios.get(`payments/available-options`)
        .then((res) => {
            const paymentTypes = res.data.data;
            dispatch(createAction('LOAD_PAYMENT_OPTIONS_SUCCESS', paymentTypes));
        }).catch((error) => {
            dispatch(createAction('LOAD_PAYMENT_OPTIONS_ERROR'));
        });
}

export const setOnlinePaymentOption = (selectedPaymentOption) => (dispatch, getState) => {
    if (!selectedPaymentOption) {
        return;
    }
    dispatch(createAction('SET_PAYMENT_OPTION', {paymentOption: selectedPaymentOption}));
}

export const initiatePayUMoneyPayment = (selectedPaymentOption) => (dispatch, getState) => {
    const state = getState().data;
    const cart = state.cart;
    if (!cart.id) {
        return;
    }
    dispatch(createAction('INITIATE_PAYMENT_INPROGRESS'));
    axios.get(`payments/initiate/payumoney/cart/${cart.id}`)
        .then((res) => {
            dispatch(createAction('INITIATE_PAYMENT_SUCCESS'));
            if (!window.bolt) {                
                dispatch(createAction('INITIATE_PAYMENT_ERROR'));
            }
            window.bolt.launch(res.data.data, {
                responseHandler: (response) => {
                    console.log(JSON.stringify(response.response));
                },
                catchException: (response) => {
                    dispatch(createAction('HANDLE_PAYUMONEY_PAYMENT_RESPONSE'), response.response);
                    dispatch(redirectToOrderConfirmation());
                    console.log('Error: ' + JSON.stringify(response.response));
                }
            });
        }).catch((error) => {
            dispatch(createAction('INITIATE_PAYMENT_ERROR'));
        });
}

export const initiatePaytmPayment = (selectedPaymentOption) => (dispatch, getState) => {
    const state = getState().data;
    const cart = state.cart;
    if (!cart.id) {
        return;
    }
    dispatch(createAction('INITIATE_PAYTM_PAYMENT_INPROGRESS'));
    axios.get(`payments/initiate/paytm/cart/${cart.id}`)
        .then((res) => {
            _launchPaytmCheckout(res.data.data);
            
            //dispatch(createAction('INITIATE_PAYTM_PAYMENT_SUCCESS', {paytmPaymentRequest: res.data.data}));
            //dispatch(push('/make-payment'));
        }).catch((error) => {
            dispatch(createAction('INITIATE_PAYTM_PAYMENT_ERROR'));
        });
}

export const submitOrder = (selectedPaymentOptionId) => (dispatch, getState) => {
    const state = getState().data;
    const checkoutData = _get(state, 'checkout');
    const cart = state.cart;
    const paymentOptionId = selectedPaymentOptionId;
    if (!cart.id || !paymentOptionId) {
        return;
    }
    dispatch(createAction('SUBMIT_ORDER_INPROGRESS'));
    axios.post(`orders/submit-order`, {
        "orderId": cart.id,
        "deliveryAddressId": _get(checkoutData, 'deliveryAddress.selectedAddressId'),
        "deliverySlotId": _get(checkoutData, 'deliveryTime.selectedDeliverySlot.id'),
        "deliveryDate": _get(checkoutData, 'deliveryTime.selectedDeliverySlot.date'),
        "paymentOptionId": paymentOptionId
    }).then((res) => {
        if (paymentOptionId === paymentOptionsConst.pauUMoney) {
            if (!window.bolt) {                
                dispatch(createAction('SUBMIT_ORDER_SUCCESS'));
            }
            window.bolt.launch(res.data.data.payUMoneyRequest, {
                responseHandler: (response) => {
                    dispatch(createAction('HANDLE_PAYUMONEY_PAYMENT_RESPONSE', response.response));
                    dispatch(redirectToOrderConfirmation());
                    console.log(JSON.stringify(response.response));
                },
                catchException: (response) => {
                    console.log('Error: ' + JSON.stringify(response.response));
                }
            });
        } else if(paymentOptionId === paymentOptionsConst.paytm) {
            _launchPaytmCheckout(res.data.data.paytmRequest);
        } else if (paymentOptionId === paymentOptionsConst.cod) {
            dispatch(redirectToOrderConfirmation());
        }
        
        //dispatch(createAction('INITIATE_PAYTM_PAYMENT_SUCCESS', {paytmPaymentRequest: res.data.data}));
        //dispatch(push('/make-payment'));
    }).catch((error) => {
        dispatch(createAction('SUBMIT_ORDER_ERROR'));
    });
}

const _launchPaytmCheckout = (params) => {
    let paytmCheckoutForm = document.getElementById('paytm-checkout-form');
    if (paytmCheckoutForm) {
        paytmCheckoutForm.parentNode.removeChild(paytmCheckoutForm);
    }
    paytmCheckoutForm = document.createElement("form");
    paytmCheckoutForm.setAttribute("method", "POST");
    paytmCheckoutForm.setAttribute("action", `${paytmConfig.url}${params['ORDER_ID']}`);
    paytmCheckoutForm.setAttribute("id", "paytm-checkout-form");
    for (const paramName in params) {
        if (!params.hasOwnProperty(paramName)) {
            return;
        }
        let inputField = document.createElement("input");
        inputField.setAttribute("type", "hidden"),
        inputField.setAttribute("name", paramName),
        inputField.setAttribute("value", params[paramName] ? params[paramName].toString() : "");
        paytmCheckoutForm.appendChild(inputField);
    }
    document.body.appendChild(paytmCheckoutForm);
    try {
        paytmCheckoutForm.submit()
    } catch (error) {
        console.log("Payment processing failed. Please try again later");
    }
}
