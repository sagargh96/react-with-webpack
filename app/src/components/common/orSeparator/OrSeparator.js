import React, { Component } from 'react';
import PropTypes from 'prop-types';

/*style*/ import './OrSeparator.module.scss';

class OrSeparator extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            text = 'or'
        } = this.props;
        return (
            <div className="ps-or-separator">
                <div className="or">{text}</div>
                <div className="line one"></div>
                <div className="line two"></div>
            </div>
        );
    }
}

OrSeparator.PropTypes = {
    text: PropTypes.string
}

export default OrSeparator;