import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

import Heading from 'grommet/components/Heading';

/*style*/ import './CartStoreSummary.module.scss';
import Alert from 'components/common/alert/Alert';

//import { Alert } from 'components/common';

class CartStoreSummary extends Component {
    constructor () {
        super ();
    }
    render () {
        const {
            cartStoreSummary,
            storeDetails
        } = this.props;
        const deliveryChargeInfo = '₹' + (storeDetails.deliveryCharges.freeDeliveryAmount - cartStoreSummary.subTotal) + ' away from free delivery';
        return (
            <div className='ps-cart-store-summary'>
                <div>
                    <div className='store-name align-left text-truncate'>
                        <span className="primary-text">{storeDetails.name}</span>
                    </div>
                    <div className='align-right'> 
                        <span className="primary-text">₹{cartStoreSummary.subTotal}</span>
                    </div>
                    <div className="clear"></div>
                </div>
                { 
                    storeDetails.deliveryCharges.freeDeliveryAmount > cartStoreSummary.subTotal ?
                    (   <div>
                            <div className='store-name align-left text-truncate'>
                                <span className="secondary-text">Delivery Charges</span>
                            </div>
                            <div className='align-right'> 
                                <span className="secondary-text charge">+ ₹{cartStoreSummary.deliveryChargesApplied}</span>
                            </div>
                            <div className="clear"></div>
                            <div className='v-small-top'>
                                <Alert type='warning' text={deliveryChargeInfo}/>
                            </div>
                        </div>) :
                    (<div className='v-small-top'><Alert type='success' text='You have free delivery from this store'/></div>)
                }
            </div>
        );
    }
}

CartStoreSummary.PropTypes = {
    cartStoreSummary: PropTypes.object.isRequired,
    storeDetails: PropTypes.object.isRequired
}

export default CartStoreSummary;