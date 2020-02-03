import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from 'grommet/components/Button';
import Anchor from 'grommet/components/Anchor';
import LinkNextIcon from 'grommet/components/icons/base/LinkNext';
import Heading from 'grommet/components/Heading';

/*style*/ import './VerifyPaymentForm.module.scss';
import PriceRow from 'components/checkout/priceRow/PriceRow';

class VerifyPaymentForm extends Component {
    constructor () {
        super ();
    }
    render () {
        const {
            paymentTxnData
        } = this.props;
        return (
            <div className='ps-payment-txn-data'>
            <FORM NAME='TESTFORM' ACTION='http://localhost:5000/payments/paytm/verify' METHOD='POST'>
                {                    
                    Object.keys(paymentTxnData).map(function(key) {
                        return (
                            <input type='hidden' key={key} name={key} value={paymentTxnData[key]}/>
                        );
                    })
                }
            </FORM>
            </div>
        );
    }
}

VerifyPaymentForm.PropTypes = {
}

export default VerifyPaymentForm;