import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Tile from 'grommet/components/Tile';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Heading from 'grommet/components/Heading';
import EditIcon from 'grommet/components/icons/base/Edit';
import DeleteIcon from 'grommet/components/icons/base/Trash';
import Anchor from 'grommet/components/Anchor';

/*style*/ import './AddressTile.module.scss';

class AddressTile extends Component {
    constructor () {
        super ();
        this._renderAddressActionControl = this._renderAddressActionControl.bind(this);
        this._onEditDeliveryAddress = this._onEditDeliveryAddress.bind(this);
        this._onDeleteDeliveryAddress = this._onDeleteDeliveryAddress.bind(this);
    }
    _onEditDeliveryAddress () {
        this.props.onEditDeliveryAddress(this.props.address);
    }
    _onDeleteDeliveryAddress () {
        this.props.onDeleteDeliveryAddress(this.props.address.id);
    }
    _renderAddressActionControl () {
        const { editable } = this.props;
        const type = this.props.address.type;
        if (editable) {
            return (
                <div className="address-action-controls">
                    <Button className="delete-address ps-button icon-only small"
                        icon={<DeleteIcon className='small'/>}
                        onClick={this._onDeleteDeliveryAddress}
                        a11yTitle={`Delete ${type.label} address`}/>
                    <Button className="edit-address ps-button icon-only small"
                        icon={<EditIcon className='small'/>}
                        onClick={this._onEditDeliveryAddress}
                        a11yTitle={`Edit ${type.label} address`}/>
                </div>
            );
        }
        return null;
    }
    render () {
        const {
            name,
            line1,
            line2,
            landmark,
            region,
            phoneNumber,
            type,
            latitude,
            longitude
        } = this.props.address;
        
        return (
            <Tile className="ps-address-tile"
                separator="all" pad='medium' align="stretch"
                size="small"
                onClick={this.props.onClick} selected={this.props.selected}>
                    <Box className="v-normal-bottom" >
                        <Heading tag="h3" strong={true}>
                            {type.name}
                        </Heading>
                            <div>{line1}, {line2}</div>
                            <div>{landmark}, {region.name}</div>
                            <div>{region.city.name} {region.zipCode}</div>
                    </Box>
                    <Box className="footer">
                        <Button  className='ps-button hover-effect' label='Deliver Here'
                            fill={true}
                            primary={true}
                            onClick={() => this.props.onDeliveryAddressSelected(this.props.address)}
                            />
                    </Box>
                    {this._renderAddressActionControl()}
            </Tile>
        );
    }
}

AddressTile.PropTypes = {
    onDeliveryAddressSelected: PropTypes.func,
    onEditDeliveryAddress: PropTypes.func,
    onDeleteDeliveryAddress: PropTypes.func
}

export default AddressTile;