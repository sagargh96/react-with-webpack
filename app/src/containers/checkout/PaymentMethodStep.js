import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Tabs from 'grommet/components/Tabs';
import Tab from 'grommet/components/Tab';

/*style*/ import './Checkout.module.scss';
import OrderSummary from 'components/checkout/orderSummary/OrderSummary';
import CashOnDelivery from 'components/checkout/cashOnDelivery/CashOnDelivery';
import OnlinePaymentOptions from './OnlinePaymentOptions';
import { config } from "utils/Config";
import {paymentTypesConst, paymentOptionsConst} from './Constants';
import {setOnlinePaymentOption, initiatePaytmPayment, initiatePayUMoneyPayment, submitOrder} from './CheckoutActions';

class PaymentMethodStep extends Component {
    constructor () {
        super();
        this._renderPaymentTypes = this._renderPaymentTypes.bind(this);
        this._initiatePayment = this._initiatePayment.bind(this);
    }

    _initiatePayment () {
        const selectedPaymentOption = this.props.selectedPaymentOption;
        if (selectedPaymentOption) {
            switch (selectedPaymentOption.id) {
                case paymentOptionsConst.pauUMoney:
                    this.props.initiatePayUMoneyPayment(selectedPaymentOption);
                    break;
                case paymentOptionsConst.paytm:
                    this.props.initiatePaytmPayment(selectedPaymentOption);
                    break;
            }
        } 
    }

    _renderPaymentTypes (paymentTypes, cart, selectedPaymentOption) {
        return paymentTypes && paymentTypes.length > 0 ?
        <div className="tab-container v-normal">
            <Tabs className="ps-tabs" justify='start' responsive={false}>
                {
                    paymentTypes.map((paymentType, index) => {
                        switch (paymentType.id) {
                            case paymentTypesConst.cardWalletNetBanking:
                                return (                                
                                    <Tab key={index} title={paymentType.name}>
                                        <OnlinePaymentOptions 
                                            options={paymentType.paymentOptions}
                                            amountPayable={cart.amount}
                                            cartId={cart.id}
                                            imgBasePath={config.imagesBasePath}
                                            selectedPaymentOption={selectedPaymentOption}
                                            onChangePaymentOption={this.props.setOnlinePaymentOption}
                                            onPayNowClicked={this.props.submitOrder}
                                            />
                                    </Tab>
                                );
                            case paymentTypesConst.cash:                                
                                return (
                                    <Tab key={index} title={paymentType.name}>
                                        <CashOnDelivery
                                            options={paymentType.paymentOptions}
                                            amountPayable={cart.amount}
                                            amountErrorMessage={paymentType.amountErrorMessage}
                                            cartId={cart.id}
                                            imgBasePath={config.imagesBasePath}
                                            onSubmitOrderClicked={this.props.submitOrder}
                                        />
                                    </Tab>
                                )
                        }
                    })
                }
            </Tabs>
        </div>
        : null
    }

    render () {
        const {
            paymentTypes,
            cart,
            selectedPaymentOption
        } = this.props;

        const {
            orderId,
            amount,
            itemCount,
            subTotal,
            totalDeliveryCharges,
            savings,
        } = cart;
        return (
            <div className="payment-method-step-widget">
                {
                    this.props.isActive ?
                    <div className="body">
                        <OrderSummary 
                            orderId={orderId} 
                            amountPayable={amount} 
                            itemCount={itemCount}
                            subTotal={subTotal}
                            deliveryCharges={totalDeliveryCharges}
                            savings={savings}/>
                        {
                            this._renderPaymentTypes(paymentTypes, cart, selectedPaymentOption)
                        }
                        </div>
                    :
                    <div className="summary">
                        
                    </div>
                }
            </div>
        );
    }
}

PaymentMethodStep.PropTypes = {
};

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators ({
        setOnlinePaymentOption: setOnlinePaymentOption,
        initiatePayUMoneyPayment: initiatePayUMoneyPayment,
        initiatePaytmPayment: initiatePaytmPayment,
        submitOrder: submitOrder
    }, dispatch) 
});

const mapStateToProps = (state) => ({
    cart: state.data.cart,
    paymentTypes: state.data.checkout.paymentMethod.paymentTypes,
    selectedPaymentOption: state.data.checkout.paymentMethod.selectedPaymentOption
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentMethodStep);