import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/*style*/ import './SpinnerWithCheckmark.module.scss';

class SpinnerWithCheckmark extends Component {
    constructor (props) {
        super(props);
    }

    render () {
        const {
            isLoadComplete,
            showAnimatedTick
        } = this.props;
        
        const loaderClassNames = classnames(
            {
                'circle-loader': true,
                'load-complete': isLoadComplete && showAnimatedTick,
            }
        );
        return (
            <div className="ps-spinner-with-checkmark">
                <div className="content">
                    <div className={loaderClassNames}>
                        <div className="checkmark draw"></div>
                    </div>
                </div>
            </div>
        );
    }
}

SpinnerWithCheckmark.PropTypes = {
};

export default SpinnerWithCheckmark;