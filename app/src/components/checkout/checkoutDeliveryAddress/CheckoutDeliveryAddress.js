import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Tiles from 'grommet/components/Tiles';

/*style*/ import './CheckoutDeliveryAddress.module.scss';

class CheckoutDeliveryAddress extends Component {
    constructor () {
        super ();
    }
    render () {
        const {
            deliveryAddresses,
            selectedAddress,
            isActive
        } = this.props;
        const classes = classnames({
            'ps-checkout-user-details': true,
            'summary': isActive
        });
        let addressTiles;
        if (deliveryAddresses) {
            addressTiles = deliveryAddresses.map((item, index) => (
                <AddressTile key={item.id} item={item} index={index} />
            ));
        }
        return (
            <div className={classes}>
                <div classNmae="body">
                <Tiles flush={false} fill={false} selectable={true} onSelect={()=>{}}>
                    {addressTiles}
                </Tiles>
                </div>
                <div classNmae="summary">
                    {selectedAddress.line1}, {selectedAddress.line2}, {selectedAddress.landmark}, {selectedAddress.city} {selectedAddress.zipCode}
                </div>
            </div>
        );
    }
}

CheckoutDeliveryAddress.PropTypes = {

}

export default CheckoutDeliveryAddress;