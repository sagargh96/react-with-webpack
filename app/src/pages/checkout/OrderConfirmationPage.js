import React, { Component } from 'react';
import {parseQueryString} from 'utils/helpers';

import OrderConfirmation from 'containers/orderConfirmation/OrderConfirmation';

import 'styles/styles.scss';
import './CheckoutPage.module.scss';

class OrderConfirmationPage extends Component {
	render() {
		return (
			<div className="order-confirmation-page row page-wrapper v-small-top">
                <div className="large-8 large-offset-2 column">                
                    <OrderConfirmation/>
                </div>
            </div>
		);
	}
}

export default OrderConfirmationPage;