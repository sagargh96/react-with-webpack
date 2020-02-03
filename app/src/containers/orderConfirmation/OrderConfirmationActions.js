import axios from 'api';
import { createAction } from 'utils/helpers';

export const getConfirmedOrder = (orderId) => (dispatch, getState) => {
    dispatch({ type: 'GET_CONFIRMED_ORDER_INPROGRESS' });
    axios.get(`orders/order-confirmation/${orderId}`)
    .then((res) => {
        if (res.status === 200 && res.data) {
            dispatch(createAction('GET_CONFIRMED_ORDER_SUCCESS', res.data.data));
            setTimeout(()=>{
                dispatch(createAction('SHOW_ANIMATED_TICK'));
            }, 1000);
        }                
    }).catch ((error) => {
        console.log("getConfirmedOrder error");
    });
}

export const verifyPaymentAndConfirmOrder = (orderId, paymentTxnData) => (dispatch, getState) => {
    let paymentGW = 'paytm';
    if (paymentTxnData.payuMoneyId) {
        paymentGW = 'payumoney';
    }
    axios.post(`payments/verify/${paymentGW}`, paymentTxnData)
        .then((res) => {
            if (res.status === 200 && res.data) {
                dispatch(getConfirmedOrder(orderId));
            }
        }).catch ((error) => {
            console.log("verifyPayment error");
        });
}