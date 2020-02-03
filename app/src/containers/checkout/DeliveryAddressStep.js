import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Tiles from 'grommet/components/Tiles';
import Anchor from 'grommet/components/Anchor';
import AddCircleIcon from 'grommet/components/icons/base/AddCircle';
import AddressTile from 'components/account/addressTile/AddressTile';

import {setDeliveryAddress, loadAddresses, addNewDeliveryAddress, 
    editDeliveryAddress, cancelDeliveryAddress,
    saveDeliveryAddress, deleteDeliveryAddress} from './CheckoutActions';
import AddressForm from '../../components/account/addressForm/AddressForm';
import Loader from 'components/common/loader/Loader';

class DeliveryAddressStep extends Component {
    constructor () {
        super();
        this._renderAddressForm = this._renderAddressForm.bind(this);
        this._renderAddressList = this._renderAddressList.bind(this);
        this._renderAddressTiles = this._renderAddressTiles.bind(this);
        this._selectDeliveryAddress = this._selectDeliveryAddress.bind(this);
        this._getSelectedAddressById = this._getSelectedAddressById.bind(this);
        this._getAddressString = this._getAddressString.bind(this)
        this._selectedAddress = null;
    }

    componentDidMount () {
        if (this.props.isActive) {
            this.props.loadAddresses();
        }
    }
    
    componentWillReceiveProps(nextProps) {
        if (!this.props.isActive && nextProps.isActive) {
            this.props.loadAddresses();
        }
    }

    _selectDeliveryAddress (selectedAddress) {
        this.props.setDeliveryAddress(selectedAddress);
    }

    _getSelectedAddressById (selectedAddressId) {
        const addresses = this.props.deliveryAddress.addresses;
        if (addresses && selectedAddressId) {
            return addresses.find(address => address.id === selectedAddressId);
        }
        return {};
    }

    _getAddressString (selectedAddressId) {
        const selectedAddress = this._getSelectedAddressById(selectedAddressId)
        return selectedAddress.line1 + ', ' +
        selectedAddress.line2 + ', ' +
        selectedAddress.landmark + ', ' +
        selectedAddress.region.name + ', ' +
        selectedAddress.region.city.name + ', ' + 
        selectedAddress.region.zipCode
    }

    _renderAddressForm () {
        const {
            location,
            selectedAddressId,
            saveAddresStatus,
            cancelDeliveryAddress,
            saveDeliveryAddress,
        } = this.props;
        return <AddressForm 
            isCheckoutDeliveryAddress={true} 
            address={this._getSelectedAddressById(selectedAddressId)}
            location={location}
            saveAddresStatus={saveAddresStatus}
            onCancelAddress={cancelDeliveryAddress}
            onSaveAddress={saveDeliveryAddress}/>
    }

    _renderAddressList () {
        const {
            addNewDeliveryAddress,
            status,
        } = this.props;
        if (status === 'LOAD_ADDRESSES_INPROGRESS') {
            return (
                <div className="loader-wrapper">
                    <Loader style='inverted' size='normal'/>
                </div>
            );
        }
        return (
            <div className="address-list">
            <div className="v-normal-bottom">
                <Anchor icon={<AddCircleIcon className="medium"/>}
                    className="small"
                    label='Add new address'
                    primary={true} 
                    onClick={addNewDeliveryAddress}/>                            
            </div>
            <Tiles fill={false}
                pad="none"
                responsive={false}>
                    { this._renderAddressTiles() }
            </Tiles>
        </div>
        )
    }

    _renderAddressTiles () {
        const {
            deliveryAddress,
            selectedAddressId,
            editDeliveryAddress,
            deleteDeliveryAddress
        } = this.props;
        let addressTiles;
        if (deliveryAddress && deliveryAddress.addresses) {
            addressTiles = deliveryAddress.addresses.map((item, index) => {
                if (!item.type) {
                    item.type = {id: 1, name: 'Home'}
                }
                if (selectedAddressId === item.id) {
                    this._selectedAddress = item;
                }
                return(
                    <AddressTile key={item.id} 
                    address={item} 
                    index={index} 
                    editable
                    onDeliveryAddressSelected={(item) => this._selectDeliveryAddress(item)}
                    onEditDeliveryAddress={editDeliveryAddress}
                    onDeleteDeliveryAddress={deleteDeliveryAddress}
                    />
                );
            });
        }
        return addressTiles;
    }

    render () {
        const {
            location,
            deliveryAddress,
            selectedAddressId,
            isActive,
            showAddressForm,
            saveAddresStatus,
            addNewDeliveryAddress,
            editDeliveryAddress,
            cancelDeliveryAddress,
            saveDeliveryAddress,
            deleteDeliveryAddress
        } = this.props;
        
        
        return (
            <div className="delivery-address-step-widget">
                {
                    isActive ?
                    <div className="body">
                        {
                            showAddressForm ? this._renderAddressForm() : this._renderAddressList()                            
                        }                        
                    </div>
                    :
                    (this.props.isCompleted ?
                    <div className="summary">
                    {
                        this._getAddressString(this.props.selectedAddressId)
                    }
                    </div> : null)
                }
            </div>
        );
    }
}

DeliveryAddressStep.PropTypes = {
};

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators ({
        setDeliveryAddress: setDeliveryAddress,
        loadAddresses: loadAddresses,
        editDeliveryAddress: editDeliveryAddress,
        addNewDeliveryAddress: addNewDeliveryAddress,
        cancelDeliveryAddress: cancelDeliveryAddress,
        saveDeliveryAddress: saveDeliveryAddress,
        deleteDeliveryAddress: deleteDeliveryAddress
    }, dispatch) 
});

const mapStateToProps = (state) => ({
    deliveryAddress: state.data.checkout.deliveryAddress,
    selectedAddressId: state.data.checkout.deliveryAddress.selectedAddressId,
    showAddressForm: state.ui.checkout.showAddressForm,
    location: state.data.location
});

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryAddressStep);