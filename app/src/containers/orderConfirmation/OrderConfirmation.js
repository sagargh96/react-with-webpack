import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/*style*/ import './OrderConfirmation.module.scss';
import OrderConfirmationSummary from 'components/checkout/orderConfirmationSummary/OrderConfirmationSummary';
import OrderConfirmationHeader from 'components/checkout/orderConfirmationHeader/OrderConfirmationHeader';
import OrderSummary from 'components/checkout/orderSummary/OrderSummary';

import {clearCheckoutData } from 'containers/checkout/CheckoutActions';
import { verifyPaymentAndConfirmOrder, getConfirmedOrder } from './OrderConfirmationActions';
import { clearCartData } from 'containers/cart/CartActions';
import { redirectToHome, redirectToMyOrders } from 'utils/CommonActions';
import {paymentOptionsConst} from 'containers/checkout/Constants';
class OrderConfirmation extends Component {
    constructor () {
        super();
        this._getPaymentText = this._getPaymentText.bind(this);
    }

    componentDidMount () {
        const cart = this.props.cart;
        const paymentTxnData = this.props.paymentTxnData;
        this.props.clearCartData();
        this.props.clearCheckoutData();
        if (!cart.id) {
            this.props.redirectToHome();
        } else if (paymentTxnData) {
            this.props.verifyPaymentAndConfirmOrder(cart.id, paymentTxnData);
        } else {
            this.props.getConfirmedOrder(cart.id);
        }
    }

    _getPaymentText (orderPayment) {
        switch (orderPayment.paymentOptionId) {
            case paymentOptionsConst.paytm:
                return 'Paid online with Paytm';
            case paymentOptionsConst.cod:
                return 'Pay on delivery';
            case paymentOptionsConst.pauUMoney:
                return 'PAid online with Payumoney'
        }
    }

    render () {
        const {
            orderConfirmationData = {},
            redirectToHome,
            redirectToMyOrders
        } = this.props;
        const userDetails = {
            firstName: orderConfirmationData.userFirstName,
            lastName: orderConfirmationData.userLastName,
            phoneNumber: orderConfirmationData.userPhoneNumber
        };
    
        const headerTexts = orderConfirmationData.isLoadComplete ?
            {
                text1: "Order Placed Successfully",
                text2: orderConfirmationData.orderNumber
            } :
            {
                text1: "Transaction is being processed",
                text2: "Please wait ...",
                text3: "(Please do not press 'Refresh' or 'Back' button)"
            }
            
        return (
            <div className="order-confirmation-widget">
                <div className="order-conf-header-container">
                    <OrderConfirmationHeader 
                        isLoadComplete={orderConfirmationData.isLoadComplete}
                        showAnimatedTick={orderConfirmationData.showAnimatedTick}
                        headerTexts={headerTexts}/>
                </div>
                {
                    orderConfirmationData.isLoadComplete ?
                    <div className="order-confirmation-container row v-small-top">
                        <div className="order-conf-summary-container column large-8 small-12">
                            <OrderConfirmationSummary
                                amount={orderConfirmationData.amount}
                                userDetails={userDetails}
                                deliveryAddress={orderConfirmationData.orderDeliveryAddress}
                                deliverySlot={orderConfirmationData.orderDeliverySlot}
                                paymentText={this._getPaymentText(orderConfirmationData.orderPayment)}
                                onTrackOrderClick={redirectToMyOrders}
                                onContinueShoppingClick={redirectToHome}
                                />
                        </div>
                        <div className="column large-4 small-12 v-small-top">
                            <OrderSummary heading="Order Summary" 
                                orderId={orderConfirmationData.orderId} 
                                amountPayable={orderConfirmationData.amount} 
                                itemCount={0}
                                subTotal={orderConfirmationData.subTotal}
                                deliveryCharges={orderConfirmationData.shippingCharges}
                                savings={orderConfirmationData.discount}/>
                        </div>
                    </div>
                    : null
                }
            </div>
        );
    }
}

OrderConfirmation.PropTypes = {
};

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators ({
        clearCartData: clearCartData,
        clearCheckoutData: clearCheckoutData,
        verifyPaymentAndConfirmOrder: verifyPaymentAndConfirmOrder,
        getConfirmedOrder: getConfirmedOrder,
        redirectToHome: redirectToHome,
        redirectToMyOrders: redirectToMyOrders
    }, dispatch) 
});

const mapStateToProps = (state) => ({
    paymentTxnData: state.data.paymentTxn,
    cart: state.data.cart,
    orderConfirmationData: state.data.orderConfirmation
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderConfirmation);