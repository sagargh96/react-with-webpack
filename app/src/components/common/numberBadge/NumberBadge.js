import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/*style*/ import './NumberBadge.module.scss';

class NumberBadge extends Component {
    constructor (props) {
        super (props);
    }

    render () {
        
        const {
            children,
            type
         } = this.props; 
        const classNames = classnames({
            'ps-number-badge': true,
            'fill': !type || type === 'fill',
            'plain': type === 'plain'
        });      
        return (
            <div className={classNames}>
                {children}
            </div>
        );
    }
}

export default NumberBadge;