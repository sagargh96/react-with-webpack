import React, { Component } from 'react';
import {parseQueryString} from 'utils/helpers';

import PaytmPaymentForm from 'containers/checkout/PaytmPaymentForm';

class PaytmPaymentPage extends Component {
	render() {
		return (
			<div className="paytm-payment-page">
               <PaytmPaymentForm/>
            </div>
		);
	}
}

export default PaytmPaymentPage;