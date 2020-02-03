import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/*style*/ import './SpinnerDots.module.scss';

class SpinnerDots extends Component {
    constructor (props) {
        super(props);
    }

    render () {
        const {
            size='small',
            style=''
        } = this.props
        return (
            <div className={`ps-spinner-dots ${style} ${size}`}>
                <div className="dot1"></div>
                <div className="dot2"></div>
                <div className="dot3"></div>
            </div>
        );
    }
}

SpinnerDots.PropTypes = {
    render: PropTypes.func.isRequired
};

export default SpinnerDots;