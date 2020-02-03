import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from 'grommet/components/Button';

/*style*/ import './ButtonWithSpinner.module.scss';
import SpinnerDots from '../spinnerDots/SpinnerDots';

class ButtonWithSpinner extends Component {
    constructor (props) {
        super(props);
    }

    render () {
        let labelWithSpinner = this.props.label;
        let type = this.props.type;
        if (!this.props.onClick) {
            type = 'button';
            labelWithSpinner = (
                <div className='label-wrapper'>
                    <span>{this.props.label}</span>
                    <SpinnerDots/>
                </div>
            );
        }
        const {className, ...propsWithoutClassName} = this.props;
        const _props = {...propsWithoutClassName, label: labelWithSpinner, type: type}
        const customClassName = this.props.customClassName;
        return (
            <Button className={`ps-button ps-button-with-spinner hover-effect ${className}`} {..._props}/>
        );
    }
}

ButtonWithSpinner.PropTypes = {
    render: PropTypes.func.isRequired
};

export default ButtonWithSpinner;