import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class UserDetailsStep extends Component {
    constructor () {
        super();
    }

    render () {
        const {
            firstName,
            lastName,
            phoneNumber
        } = this.props.userDetails;
        return (
            <div className="user-details-step-widget">
                <div className="summary">{firstName} {lastName}, {phoneNumber}</div>
            </div>
        );
    }
}

UserDetailsStep.PropTypes = {
};

const mapDispatchToProps = (dispatch) => ({
});

const mapStateToProps = (state) => ({
    userDetails: state.data.checkout.userDetails
});

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailsStep);