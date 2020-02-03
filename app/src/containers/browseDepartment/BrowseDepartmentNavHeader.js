import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DeliveryIcon from 'grommet/components/icons/base/Deliver';
import ClockIcon from 'grommet/components/icons/base/Clock';

/*style*/ import './BrowseDepartmentNavHeader.module.scss';
import Avatar from 'components/common/avatar/Avatar';

class BrowseDepartmentNavHeader extends Component {
    render () {
        const {
            storeDetails
        } = this.props;
        if (!storeDetails) {
            return null;
        }
        return (
            <div className='ps-browse-department-nav-header row'>
                <div className='column large-3 small-2 store-avatar'>
                    <Avatar link={storeDetails.link} text='V1'/>
                </div>
                <div className='column large-9 store-details'>
                    <h4>{storeDetails.name}</h4>
                    <div className='secondary-text small'>
                        <div><DeliveryIcon className='xsmall'/> {storeDetails.deliveryCharges.freeDeliveryText} {storeDetails.deliveryCharges.freeDeliveryAmount}</div>
                        <div><ClockIcon className='xsmall'/> Next day delivery</div>
                    </div>
                </div>
            </div>
        );
    }
}

BrowseDepartmentNavHeader.PropTypes = {
    storeDetails: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    storeDetails: state.data.store.storeDetails
});

export default connect(mapStateToProps)(BrowseDepartmentNavHeader);