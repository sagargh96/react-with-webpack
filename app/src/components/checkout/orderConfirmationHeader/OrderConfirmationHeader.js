import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from 'grommet/components/Button';
import Box from 'grommet/components/Box';
import SpinnerWithCheckmark from 'components/common/spinnerWithCheckmark/SpinnerWithCheckmark';
import PaymentIcon from 'grommet/components/icons/base/Money';
import LocationIcon from 'grommet/components/icons/base/Location';
import OrderItemsIcon from 'grommet/components/icons/base/Sort';
import ScheduleIcon from 'grommet/components/icons/base/schedule';
import Heading from 'grommet/components/Heading';

/*style*/ import './OrderConfirmationHeader.module.scss';
import PriceRow from 'components/checkout/priceRow/PriceRow';

class OrderConfirmationHeader extends Component {
    constructor () {
        super ();
    }
    render () {
        const {
            headerTexts,
            isLoadComplete = false,
            showAnimatedTick = false
        } = this.props;
        return (
            <div className='ps-order-confirmation-header'>
                <SpinnerWithCheckmark isLoadComplete={isLoadComplete} showAnimatedTick={showAnimatedTick}/>
                <h2>{headerTexts.text1}</h2>
                <div>{headerTexts.text2}</div>
                {
                    headerTexts.text3 ? 
                        <div>{headerTexts.text3}</div> : null
                }
            </div>
        );
    }
}

OrderConfirmationHeader.PropTypes = {
    
}

export default OrderConfirmationHeader;