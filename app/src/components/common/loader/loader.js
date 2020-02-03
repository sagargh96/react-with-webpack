import React, { Component } from 'react';
import PropTypes from 'prop-types';

/*style*/ import './Loader.module.scss';
import SpinnerDots from 'components/common/spinnerDots/SpinnerDots';

class Loader extends Component {
    constructor (props) {
        super(props);
    }

    render () {
        const {
            size='small',
            style='',
            type='dots-type',
            position='center-aligned'
        } = this.props
        return (
            <div className={`ps-loader ${position} ${size} ${style} ${type}`}>
                <div className="loader">Loading...</div>
            </div>
        );
    }
}

Loader.PropTypes = {
    type: PropTypes.func.string,
    style: PropTypes.func.string,
    size: PropTypes.func.string
};

export default Loader;