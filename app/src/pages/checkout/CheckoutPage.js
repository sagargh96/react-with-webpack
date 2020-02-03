import React, { Component } from 'react';
import {parseQueryString} from 'utils/helpers';

import Heading from 'grommet/components/Heading';

import Checkout from 'containers/checkout/Checkout';
import CheckoutOrderSummary from 'containers/checkoutOrderSummary/CheckoutOrderSummary';
//import 'styles/styles.scss';
import './CheckoutPage.module.scss';

class CheckoutPage extends Component {
	render() {
		const queryParamString = this.props.location.search;
		const queryParams = parseQueryString(queryParamString);
		const redirectUrl = queryParams ? queryParams['redirectUrl'] : null;

		return (
			<div className="checkout-page row page-wrapper v-small-top">
                <div className="small-12 column">                
                    <Heading tag="h3" margin="none" strong={true}>
                        Checkout
                    </Heading>
                </div>
                
                <div className="small-12 large-8 column no-padding">
                    <div className="checkout-wrapper">
                        <Checkout/>
                    </div>
                </div>
                <div className="small-12 medium-4 large-4 column no-padding">
                    <CheckoutOrderSummary/>
                </div>
            </div>
		);
	}
}

export default CheckoutPage;