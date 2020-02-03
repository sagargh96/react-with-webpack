import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class PaytmPaymentForm extends Component {
    constructor () {
        super ();
    }
    componentDidMount () {
        const paytmForm = document.forms.paytmForm;
        setTimeout(() => {
            paytmForm.submit();
        }, 1000);
    }
    render () {
        const {
            MID, 
            WEBSITE,
            ORDER_ID,
            CUST_ID,
            MOBILE_NO,
            EMAIL,
            INDUSTRY_TYPE_ID,
            CHANNEL_ID,
            TXN_AMOUNT,
            CALLBACK_URL,
            CHECKSUMHASH
        } = this.props.paytmPaymentRequest;
        return (
            <div className='paytm-payment-form-widget'>
                <form method="post" action={`https://securegw-stage.paytm.in/theia/processTransaction?ORDER_ID=${ORDER_ID}`} name="paytmForm">
                <table>
                    <tbody>
                        <input type="hidden" name="MID" value={MID}/>
                        <input type="hidden" name="WEBSITE" value={WEBSITE}/>
                        <input type="hidden" name="ORDER_ID" value={ORDER_ID}/>
                        <input type="hidden" name="CUST_ID" value={CUST_ID}/>
                        <input type="hidden" name="MOBILE_NO" value={MOBILE_NO}/>
                        <input type="hidden" name="EMAIL" value={EMAIL}/>
                        <input type="hidden" name="INDUSTRY_TYPE_ID" value={INDUSTRY_TYPE_ID}/>
                        <input type="hidden" name="CHANNEL_ID" value={CHANNEL_ID}/>
                        <input type="hidden" name="TXN_AMOUNT" value={TXN_AMOUNT}/>
                        <input type="hidden" name="CALLBACK_URL" value={CALLBACK_URL}/>
                        <input type="hidden" name="CHECKSUMHASH" value={CHECKSUMHASH}/>                        
                    </tbody>
                </table>
                </form>
            </div>
        );
    }
}

PaytmPaymentForm.PropTypes = {
}

const mapStateToProps = (state) => ({
    paytmPaymentRequest: state.data.checkout.paymentMethod.paytmPaymentRequest
});

export default connect(mapStateToProps)(PaytmPaymentForm);