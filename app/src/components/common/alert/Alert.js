import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

/*style*/ import './Alert.module.scss'

class Alert extends Component {
    constructor () {
        super ();
    }
    render () {
        const {
            type,
            text
        } = this.props;
        return (
            <div className={`ps-alert ${type}`}>
                <span className='secondary-text'>{text}</span>
            </div>
        );
    }
}

Alert.PropTypes = {
    type: PropTypes.oneOf(['info', 'warning', 'error', 'success']),
    text: PropTypes.string.isRequired
}

export default Alert;