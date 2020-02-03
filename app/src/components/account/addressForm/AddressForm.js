import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-formify';

import Heading from 'grommet/components/Heading';
import FormFields from 'grommet/components/FormFields';
import FormField from 'grommet/components/FormField';
import Footer from 'grommet/components/Footer';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Tile from 'grommet/components/Tile';
import Tiles from 'grommet/components/Tiles';

import ButtonWithSpinner from 'components/common/buttonWithSpinner/ButtonWithSpinner';
import {buildValidationRules} from 'utils/validationRules';
import RadioButton from 'grommet/components/RadioButton';

/*style*/ import './AddressForm.module.scss';

class AddressForm extends Component {
    constructor(props) {
        super(props);
        this._renderAddressTypeTiles = this._renderAddressTypeTiles.bind(this);
        this._onAddressTypeTileSelect = this._onAddressTypeTileSelect.bind(this);
        this._onSaveAddress = this._onSaveAddress.bind(this);
        this._onDeleteAddress = this._onDeleteAddress.bind(this);

        this._addressTypes = [{
            id: 1,
            label: 'Home'
        },{
            id: 2,
            label: 'Office'
        },{
            id: 3,
            label: 'Other'
        }];        
        this.validationRules = buildValidationRules({
            line1: [{
                rule: 'required',
                message: 'Required'
            }],
            line2: [],
            typeId: [],
            landmark: [{
                rule: 'required',
                message: 'Required'
            }],
            zipCode: [
                {
                    rule: 'required',
                    message: 'Zip code is required'
                }
            ]
        });
    }
    _onSaveAddress (addressForm) {
        this.props.onSaveAddress(addressForm, this.props.address.id);
    }

    _onDeleteAddress (addressId) {
        this.props.onDeleteAddress(addressId);
    }

    _onAddressTypeTileSelect (selectedIndex) {
        this._formState.set('typeId', this._addressTypes[selectedIndex].id);
    }
    _renderAddressTypeTiles (state, addressType) {
        //Keeping form state to use on selecting address type tile
        this._formState = state;        
        const {address} = this.props;
        const selectedAddressType = addressType.value || this._addressTypes[0].id;
        let selectedIndex = 0;
        const addressTypeTiles = this._addressTypes.map((item, index) => {
            if (selectedAddressType === item.id) {
                selectedIndex = index;
            }
            return (<Tile key={item.id} separator="all" pad='small' margin="none" size="small"
            onClick={() => {return null}}>{item.label}</Tile>)
        });
        return (
            <Tiles pad="none" 
                selectable={true} 
                fill={false} flush={true} 
                className="address-type-tiles v-normal-bottom"
                responsive={false}
                selected={selectedIndex}
                onSelect={this._onAddressTypeTileSelect}>
                {addressTypeTiles}
            </Tiles>
        )
    }

    render () {
        let address = {
            city: this.props.location.city.name,
            zipCode: this.props.location.zipCode,
            region: this.props.location.locality,
            ...this.props.address,
            typeId: this.props.address.type && this.props.address.type.id || 1
        }
        const {
            headingText,
            subHeadingText,
        } = this.props.address;
        const {
            isCheckoutDeliveryAddress,
            saveAddressStatus,
            onCancelAddress,
            onSaveAddress,
            onDeleteAddress
        } = this.props;
        return (
            <div className="ps-address-form ps-form">
                <div>
                    { 
                        headingText ?
                        <Heading tag="h1" margin="none" strong={true} align="center">
                            {headingText}
                        </Heading>
                        : ""
                    }
                    {
                        subHeadingText ?
                        <div className="sub-heading align-center">
                            {subHeadingText}
                        </div>
                        : ""
                    }
                </div>
                <Form onSubmit={this._onSaveAddress} 
                defaultValue={address} rules={this.validationRules}>
                    {(state, errors) => (
                    <div className="grommetux-form grommetux-form--plain">
                    
                    <FormFields className='v-small-top'>                    
                        <fieldset>  
                            {this._renderAddressTypeTiles(state, {...state.typeId})}
                        </fieldset>
                        <fieldset>                                                        
                            <FormField label="Addres line 1" htmlFor="line1" error={errors.line1}>
                                <input id="line1" type="text" {...state.line1}/>
                            </FormField>                                 
                            <FormField label="Address line 2" htmlFor="line2" error={errors.line2}>
                                <input id="line2" type="text" {...state.line2}/>
                            </FormField>                                 
                            <FormField label="Landmark" htmlFor="line2" error={errors.landmark}>
                                <input id="landmark" type="text" {...state.landmark}/>
                            </FormField>
                            <FormField label="Zip code" htmlFor="zipCode" error={errors.zipCode}>
                                <input id="zipCode" type="text" {...state.zipCode} />
                            </FormField> 
                            {
                                isCheckoutDeliveryAddress ?
                                <FormField label="Instructions for delivery" htmlFor="deliveryInstructions" error={errors.password}>
                                    <textarea rows="2" type='text' id='deliveryInstructions' name='deliveryInstructions'
                                    {...state.deliveryInstructions} />
                                </FormField>
                                : null
                            }
                            <div>
                            </div>
                        </fieldset>
                    </FormFields>
                    <Footer>
                        <Box justify="start" reverse={true} full="horizontal" direction="row" responsive={false}>
                            <ButtonWithSpinner label='Save'
                                className="ps-button save-btn"
                                type='submit'
                                primary={true}
                                onClick={saveAddressStatus === 'inProgress' ? null : () => null}/>
                            <Button label='Cancel' 
                                className="ps-button hollow"
                                type='button'
                                plain={false} fill={false}
                                onClick={onCancelAddress}/>
                        </Box>
                    </Footer>
                    </div>
                    )}
                </Form>               
            </div>
        );
    }
}

AddressForm.PropTypes = {
    address: PropTypes.obj,
    onCancelAddress: PropTypes.func,
    onDeleteAddress: PropTypes.func,
    onSaveAddress: PropTypes.func
}

export default AddressForm;