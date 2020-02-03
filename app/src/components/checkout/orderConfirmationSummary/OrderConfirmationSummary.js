import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from 'grommet/components/Button';
import Box from 'grommet/components/Box';
import PaymentIcon from 'grommet/components/icons/base/Money';
import LocationIcon from 'grommet/components/icons/base/Location';
import OrderItemsIcon from 'grommet/components/icons/base/Sort';
import ScheduleIcon from 'grommet/components/icons/base/schedule';
import Heading from 'grommet/components/Heading';

/*style*/ import './OrderConfirmationSummary.module.scss';
import PriceRow from 'components/checkout/priceRow/PriceRow';
import OrderConfirmationSummaryItem from 'components/checkout/orderConfirmationSummaryItem/OrderConfirmationSummaryItem';

class OrderConfirmationSummary extends Component {
    constructor () {
        super ();
    }
    render () {
        const {
            amount,
            userDetails,
            deliveryAddress,
            deliverySlot,
            paymentText,
            onTrackOrderClick,
            onContinueShoppingClick
        } = this.props;
        return (
            <div className='ps-order-confirmation-summary'>
                
                <OrderConfirmationSummaryItem 
                    icon={<OrderItemsIcon size="medium"/>}
                    title="Your Details"
                    text={userDetails.firstName + ' ' + userDetails.lastName + ', ' + userDetails.phoneNumber}
                />
                <OrderConfirmationSummaryItem 
                    icon={<PaymentIcon size="medium"/>}
                    title="Payment"
                    text={"₹" + amount + ' ' + paymentText}
                />
                <OrderConfirmationSummaryItem 
                    icon={<ScheduleIcon size="medium"/>}
                    title="Delivery Scheduled On"
                    text={deliverySlot}
                />
                <OrderConfirmationSummaryItem 
                    icon={<LocationIcon size="medium"/>}
                    title="Delivery Address"
                    text={deliveryAddress}
                />
                <Box className="action-btn-bar  v-small-top" justify="between" full="horizontal" 
                    direction="row" responsive={false}>
                    <Button label='Track Order'
                        className="ps-button"
                        type='submit'
                        fill={true}
                        primary={true}
                        onClick={() => {onTrackOrderClick()}}/>
                    <Button label='Shop More'
                        className="ps-button"
                        type='button'
                        fill={true}
                        primary={true}                        
                        onClick={() => {onContinueShoppingClick()}}/>
                </Box>
            </div>
        );
    }
}

OrderConfirmationSummary.PropTypes = {
    amount: PropTypes.number.isRequired,
    userDetails: PropTypes.object.isRequired,
    deliveryAddress: PropTypes.string.isRequired,
    deliverySlot: PropTypes.string.isRequired,
    paymentText: PropTypes.string.isRequired,
    onTrackOrderClick: PropTypes.func.isRequired,
    onContinueShoppingClick: PropTypes.func.isRequired
}

export default OrderConfirmationSummary;