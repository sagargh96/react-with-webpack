import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from 'grommet/components/Button';
import Box from 'grommet/components/Box';
import PaymentIcon from 'grommet/components/icons/base/Money';
import LocationIcon from 'grommet/components/icons/base/Location';
import OrderItemsIcon from 'grommet/components/icons/base/Sort';
import ScheduleIcon from 'grommet/components/icons/base/schedule';
import Heading from 'grommet/components/Heading';

/*style*/ import './OrderConfirmationSummaryItem.module.scss';
import PriceRow from 'components/checkout/priceRow/PriceRow';

class OrderConfirmationSummaryItem extends Component {
    constructor () {
        super ();
    }
    render () {
        const {
            title,
            text,
            icon
        } = this.props;
        return (
            <div className='ps-order-confirmation-summary-item'>
                <Box className="summary-item padding-normal" flex={true}
                    justify='start'
                    align="center"
                    direction='row'
                    responsive={false}
                    flex='grow'>
                    <Box className="icon" alignSelf='center'>
                        {icon}
                    </Box>
                    <Box alignSelf='start'>
                        <div className="title secondary-text">{title}</div>
                        <div className="text primary-text">{text}</div>
                    </Box>
                </Box>
            </div>
        );
    }
}

OrderConfirmationSummaryItem.PropTypes = {
    icon: PropTypes.object,
    title: PropTypes.string,
    text: PropTypes.string
}

export default OrderConfirmationSummaryItem;