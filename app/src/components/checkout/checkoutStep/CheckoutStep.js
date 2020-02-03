import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Element as ScrollElement, scroller } from 'react-scroll';

import Button from 'grommet/components/Button';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import CheckMarkIcon from 'grommet/components/icons/base/Checkmark';

/*style*/ import './CheckoutStep.module.scss';
import PriceRow from 'components/checkout/priceRow/PriceRow';

class CheckoutStep extends Component {
    constructor () {
        super ();
    }
    
    componentWillReceiveProps (nextProps) {
        if (nextProps.isActive) {
            scroller.scrollTo(this.props.stepKey, { smooth: true, offset: -50 });
        }
    }
    render () {
        const {
            number,
            stepKey,
            title,
            isEditable,
            isCompleted,
            isActive,
            onChangeStep
        } = this.props;
        const stepNumClasses = classnames({
            'step-number': true,
            'active': isActive,
            'complete': isCompleted
        });
        const stepDetailsClasses = classnames({
            'step-details': true,
            'active': isActive
        });
        const transitionName = isActive ? 'checkout-step-transition' : '';
        return (
            <div className="ps-checkout-step">
                <ScrollElement name={stepKey}>
                <Box pad={{vertical: 'medium', horizontal: 'medium'}}
                    separator={this.props.last ? 'none' : 'bottom'}>
                    <Box justify="between" align="center" responsive={false} direction="row"
                        margin="none">
                        <Box direction="row" align="center" responsive={false}>
                            <div className={stepNumClasses}>
                                {!isCompleted ? number
                                :<CheckMarkIcon className='white-icon'/>}
                            </div>
                            <Heading className="step-title" tag="h3" strong={true}>{title}</Heading>
                        </Box>
                        {
                            isEditable && isCompleted && !isActive ?
                            <Box>
                                <Button className="ps-button hover-effect hollow small"
                                onClick={(e) => {
                                    e.preventDefault();
                                    onChangeStep(stepKey);
                                }} 
                                label='Change' plain={false} fill={false}/>
                            </Box> 
                            : null
                        }
                    </Box>
                    <Box className={stepDetailsClasses}>
                    {isActive ?
                    <ReactCSSTransitionGroup
                        transitionName='checkout-step-transition'
                        transitionAppear
                        transitionAppearTimeout={400}
                        transitionEnterTimeout={400}
                        transitionEnter={false}
                        transitionLeave
                        transitionLeaveTimeout={400}>
                            {this.props.children}
                    </ReactCSSTransitionGroup>
                    :
                    this.props.children
                    }
                    </Box>
                </Box>
                </ScrollElement>
            </div>
        );
    }
}

CheckoutStep.PropTypes = {
    onChangStep: PropTypes.func,
}

export default CheckoutStep;