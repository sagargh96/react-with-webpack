import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import FormField from 'grommet/components/FormField';
import RadioButton from 'grommet/components/RadioButton';
import Button from 'grommet/components/Button';

import {payUMoneyConfig} from './Constants';

class OnlinePaymentOptions extends Component {
    constructor () {
        super ();
        this._onChangeOnlinePaymentOption = this._onChangeOnlinePaymentOption.bind(this);
        this._isSelectedPaymentOption = this._isSelectedPaymentOption.bind(this);
        this._onPayNowClicked = this._onPayNowClicked.bind(this);
    }

    _onChangeOnlinePaymentOption (paymentOption) {
        this.props.onChangePaymentOption(paymentOption);
    }

    /*Need to set isSelected option like this, if we directly set condition then React throws warning
    "change a uncontrolled input of type radio to be controlled"*/
    _isSelectedPaymentOption (paymentOption) {
        if (this.props.selectedPaymentOption && this.props.selectedPaymentOption.id === paymentOption.id) {
            return true;
        }
        return false;
    }

    _onPayNowClicked () {
        if (this.props.selectedPaymentOption && this.props.selectedPaymentOption.id) {
            this.props.onPayNowClicked(this.props.selectedPaymentOption.id);
        }
    }

    render () {
        const {
            options,
            imgBasePath,
        } = this.props;
        return (
            <div className="online-payment-options-widget">
                <Helmet>
                    <script id="bolt" src={payUMoneyConfig.boltScriptUrl}
                    bolt-color={payUMoneyConfig.brandColor} bolt-logo={payUMoneyConfig.brandLogo}/>
                </Helmet>
                <FormField className="v-normal-bottom">
                    {
                        options.map((item, index) => {                  
                                return (
                                    <RadioButton id={`paymentOption-${item.id}`} 
                                        className="small"
                                        key={index}
                                        name='online-payment-option'
                                        label={<div><img
                                            alt={`${item.name} payment option`}
                                            className="option-img"
                                            src={imgBasePath + '/' + item.imgName}
                                        />
                                        </div>}
                                        checked={this._isSelectedPaymentOption(item)}
                                        onChange={this._onChangeOnlinePaymentOption.bind(this, item)} />)
                            })
                    }
                </FormField>
                    
                <Button label='Pay Now'
                    className="ps-button pay-now"
                    type='button'
                    fill={true}
                    primary={true}
                    onClick={this._onPayNowClicked}/>
            </div>
        );
    }
}

OnlinePaymentOptions.PropTypes = {
}

export default OnlinePaymentOptions;