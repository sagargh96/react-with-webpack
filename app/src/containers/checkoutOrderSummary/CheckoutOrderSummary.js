import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/*style*/ import './CheckoutOrderSummary.module.scss';
import OrderSummary from 'components/checkout/orderSummary/OrderSummary';

class CheckoutOrderSummary extends Component {
    constructor () {
        super();
    }

    render () {
        const {
            orderId,
            subTotal,
            itemCount,
            totalDeliveryCharges,
            savings,
            amount
        } = this.props.cart;
        return (
            <div className="checkout-order-summary-widget show-for-large">
                <OrderSummary heading="Order Summary" 
                orderId={orderId} 
                amountPayable={amount} 
                itemCount={itemCount}
                subTotal={subTotal}
                deliveryCharges={totalDeliveryCharges}
                savings={savings}/>
            </div>
        );
    }
}

CheckoutOrderSummary.PropTypes = {
};

const mapDispatchToProps = (dispatch) => ({
});

const mapStateToProps = (state) => ({
    cart: state.data.cart
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutOrderSummary);