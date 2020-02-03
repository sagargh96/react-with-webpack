import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from 'grommet/components/Button';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';

/*style*/ import './CheckoutUserDetails.module.scss';

class CheckoutUserDetails extends Component {
    constructor () {
        super ();
    }
    render () {
        const {
            firstName,
            lastName,
            phoneNumber
        } = this.props;
        return (
            <div className="ps-checkout-user-details">
                <div>{firstName} {lastName}, {phoneNumber}</div>
            </div>
        );
    }
}

CheckoutUserDetails.PropTypes = {
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired
}

export default CheckoutUserDetails;