import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Box from 'grommet/components/Box';
import LocationIcon from 'grommet/components/icons/base/Location';
import Button from 'grommet/components/Button';
import Anchor from 'grommet/components/Anchor';

/*style*/ import './Location.module.scss';

import Modal from 'components/common/modal/Modal';
import AccountZipCodeForm from 'components/account/accountZipCodeForm/AccountZipCodeForm';
//import { Modal, OrSeparator } from 'components/common';
//import { StoreLocationSearchBox } from 'components/store'

import { openLocationModal, closeLocationModal, checkZipCode, selectDefaultLocation, downloadTnC } from './LocationAction';

class Location extends Component {
    constructor () {
        super();
    }

    render () {
        const {
            showModal,
            checkZipCodeStatus,
            error
        } = this.props.locationUI;
        const {
            location
        } = this.props;
        let zipFormErrors = null;
        if (checkZipCodeStatus === 'error') {
            zipFormErrors = error;
        }
        const defaultLocationLinkText = location.isDefault ? "I want delivery in " + location.locality : null;
        return ( 
            <Box>               
                <Button icon={<LocationIcon />}
                    className="ps-button hover-effect"
                    label={location.locality}
                    onClick={this.props.onLocationClick}
                    plain={true} size='small' fill={false}/>                  
                <Modal 
                    isOpen={location.isDefault || showModal}                    
                    className="location-modal-widget custom-scroll-bar">
                        <AccountZipCodeForm 
                            onSubmit={this.props.onZipCodeSubmit}
                            inProgress={checkZipCodeStatus === 'inProgress'? true : false}
                            headingText='Where do you want the delivery?'
                            submitBtnText='Continue'
                            notAvailable={checkZipCodeStatus === 'NOT_AVAILABLE'}
                            defaultLocationLink={{
                                text: defaultLocationLinkText,
                                action: this.props.onSelectDefaultLocation}}
                            errors={zipFormErrors && zipFormErrors.map(error => `${error.message}`)}/>
							<Anchor label={'Download Terms and conditions'} 
                                            onClick={this.props.downloadTnC}/>
                </Modal>
            </Box>
        );
    }
}

Location.PropTypes = {
    location: PropTypes.object.isRequired,
    onLocationClick: PropTypes.func,
    onCloseClick: PropTypes.func,
    onZipCodeSubmit: PropTypes.func,
    onDefaultLocationClick: PropTypes.func
};

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators ({
        onLocationClick: openLocationModal,
        onCloseClick: closeLocationModal,
        onZipCodeSubmit: checkZipCode,
        onSelectDefaultLocation: selectDefaultLocation,
        downloadTnC: downloadTnC
    }, dispatch)
});

const mapStateToProps = (state) => ({
    location: state.data.location,
    locationUI: state.ui.location
});

export default connect(mapStateToProps, mapDispatchToProps)(Location);