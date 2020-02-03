import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DeliveryIcon from 'grommet/components/icons/base/Deliver';
import ClockIcon from 'grommet/components/icons/base/Clock';

/*style*/ import './StoreDetails.module.scss';

class StoreDetails extends Component {
    constructor () {
        super ();
    }
    render () {
        const {
            storeDetails
        } = this.props;
        return (
            <div className='ps-store-details row align-center padding-small'>
                <div className='small-12 columns no-padding'>
                    <h2 className='store-title'>{storeDetails.name}</h2>
                </div>
                <div className='small-12'>
                        <span className='sub-title'>
                            <DeliveryIcon className='white-icon'/> 
                            {storeDetails.deliveryCharges.freeDeliveryText} ₹{storeDetails.deliveryCharges.freeDeliveryAmount}
                        </span>
                        <span  className='sub-title'>
                            <ClockIcon className='white-icon'/>Next day delivery
                        </span>
                </div>
            </div>
        )
    }
}

StoreDetails.PropTypes = {
    storeDetails: PropTypes.object.isRequired
}

export default StoreDetails;