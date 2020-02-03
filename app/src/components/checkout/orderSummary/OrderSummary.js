import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from 'grommet/components/Button';
import Anchor from 'grommet/components/Anchor';
import LinkNextIcon from 'grommet/components/icons/base/LinkNext';
import Heading from 'grommet/components/Heading';

/*style*/ import './OrderSummary.module.scss';
import PriceRow from 'components/checkout/priceRow/PriceRow';

class OrderSummary extends Component {
    constructor () {
        super ();
    }
    render () {
        const {
            orderId, 
            heading,
            amountPayable,
            subTotal,
            deliveryCharges,
            savings,
        } = this.props;
        return (
            <div className='ps-order-summary'>
                {
                    heading ?
                        <Heading tag="h3" strong={true}>{heading}</Heading>
                    : null
                }
                <ul className="price-summary">
                    <li>
                        <PriceRow caption='Total' value={`₹${subTotal || 0}`} style="secondary"/>
                    </li>
                    <li>
                        <PriceRow caption='Delivery Charges' value={`+ ₹${deliveryCharges || 0}`} style="secondary"
                        type="charge"/>
                    </li>
                </ul>
                <ul className="total-amount">
                    <li>
                        <PriceRow caption='Amount Payable' value={`₹${amountPayable || 0}`} style="primary"/>
                    </li>
                    <li>
                        <PriceRow caption='Your Savings' value={`₹${savings || 0}`} style="highlight"/>
                    </li>
                </ul>
            </div>
        );
    }
}

OrderSummary.PropTypes = {
    orderId: PropTypes.number,
    heading: PropTypes.string,
    amount: PropTypes.number.required,
    deliveryCharges: PropTypes.number,
    savings: PropTypes.number
}

export default OrderSummary;