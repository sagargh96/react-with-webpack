import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Tile from 'grommet/components/Tile';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import EditIcon from 'grommet/components/icons/base/Edit';
import Anchor from 'grommet/components/Anchor';

/*style*/ import './DeliveryAddressTile.module.scss';

class DeliveryAddressTile extends Component {
    constructor () {
        super ();
    }
    render () {
        const {
            name,
            line1,
            line2,
            landmark,
            city,
            zipCode,
            phoneNumber,
            type,
            latitude,
            longitude,
            editable
        } = this.props.address;
        
        let editControl;
        if (editable) {
        editControl = (
            <Anchor className="edit-address" icon={<EditIcon />}
            path={`/edit-address`}
            a11yTitle={`Edit ${type} address`} />
        );
        }
        return (
            <Tile className="ps-delivery-address-tile" 
                separator="all" pad='small' justify="between"
                size="small"
                onClick={this.props.onClick} selected={this.props.selected}>
                <Box>
                    <Heading tag="h3" strong={true}>
                        {type}
                    </Heading>
                    <div>{line1}</div>
                    <div>{line2}</div>
                    <div>{landmark}</div>
                    <div>{city} {zipCode}</div>
                </Box>
            </Tile>
        );
    }
}

DeliveryAddressTile.PropTypes = {
    
}

export default DeliveryAddressTile;