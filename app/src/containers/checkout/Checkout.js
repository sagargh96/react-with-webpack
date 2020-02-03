import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/*style*/ import './Checkout.module.scss';
import CheckoutStep from 'components/checkout/checkoutStep/CheckoutStep';
import CheckoutUserDetails from 'components/checkout/checkoutUserDetails/CheckoutUserDetails';
import DeliveryAddressStep from 'containers/checkout/DeliveryAddressStep';
import DeliveryTimeStep from 'containers/checkout/DeliveryTimeStep';
import UserDetailsStep from 'containers/checkout/UserDetailsStep';
import PaymentMethodStep from 'containers/checkout/PaymentMethodStep';

import {gotoCheckoutStep, initChckoutFlow} from './CheckoutActions';

class Checkout extends Component {
    constructor () {
        super();
    }

    componentDidMount () {
        this.props.initChckoutFlow();
    }

    _isVisitedStep (stepKey) {
        return this.props.visitedSteps.indexOf(stepKey) > -1;
    }

    _isCompletedStep (stepKey) {
        return this.props.completedSteps.indexOf(stepKey) > -1;
    }

    render () {
        const {
            checkoutSteps,
            activeStep,
            completedSteps,
            visitedSteps,
            gotoCheckoutStep
        } = this.props;

        const userInfoStep = checkoutSteps[0];
        const deliveryAddressStep = checkoutSteps[1];
        const deliveryTimeStep = checkoutSteps[2];
        const paymentMethodStep = checkoutSteps[3];
        return (
            <div className="checkout-widget">
                <CheckoutStep number={userInfoStep.number} 
                    stepKey={userInfoStep.key}
                    title={userInfoStep.title}
                    isActive={userInfoStep.key === activeStep.key}  
                    isVisited={this._isVisitedStep(userInfoStep.key)} 
                    isCompleted={this._isCompletedStep(userInfoStep.key)}>
                        <UserDetailsStep/>
                </CheckoutStep>
                <CheckoutStep number={deliveryAddressStep.number} 
                    stepKey={deliveryAddressStep.key}
                    title={deliveryAddressStep.title}                    
                    isActive={deliveryAddressStep.key === activeStep.key}                    
                    isVisited={this._isVisitedStep(deliveryAddressStep.key)} 
                    isCompleted={this._isCompletedStep(deliveryAddressStep.key)}
                    isEditable
                    onChangeStep={gotoCheckoutStep}>
                    <DeliveryAddressStep
                        status={deliveryAddressStep.status} 
                        isActive={deliveryAddressStep.key === activeStep.key}
                        isCompleted={this._isCompletedStep(deliveryAddressStep.key)}
                        stepKey={deliveryAddressStep.key}/>
                </CheckoutStep>
                <CheckoutStep number={deliveryTimeStep.number} 
                    stepKey={deliveryTimeStep.key}
                    title={deliveryTimeStep.title} 
                    isActive={deliveryTimeStep.key === activeStep.key}                    
                    isVisited={this._isVisitedStep(deliveryTimeStep.key)} 
                    isCompleted={this._isCompletedStep(deliveryTimeStep.key)}
                    isEditable
                    onChangeStep={gotoCheckoutStep}>
                    <DeliveryTimeStep 
                        isActive={deliveryTimeStep.key === activeStep.key}
                        isCompleted={this._isCompletedStep(deliveryTimeStep.key)}
                        stepKey={deliveryTimeStep.key}/>
                </CheckoutStep>
                <CheckoutStep number={paymentMethodStep.number}  
                    stepKey={paymentMethodStep.key}
                    title={paymentMethodStep.title}
                    isActive={paymentMethodStep.key === activeStep.key}                    
                    isVisited={this._isVisitedStep(paymentMethodStep.key)} 
                    isCompleted={this._isCompletedStep(paymentMethodStep.key)} 
                    last>
                    <PaymentMethodStep 
                        isActive={paymentMethodStep.key === activeStep.key}
                        isCompleted={this._isCompletedStep(paymentMethodStep.key)}
                        stepKey={paymentMethodStep.key}/>
                </CheckoutStep>
            </div>
        );
    }
}

Checkout.PropTypes = {
};

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators ({
        initChckoutFlow: initChckoutFlow,
        gotoCheckoutStep: gotoCheckoutStep
    }, dispatch) 
});

const mapStateToProps = (state) => ({
    checkoutSteps: state.ui.checkout.checkoutSteps,
    activeStep: state.ui.checkout.activeStep,
    completedSteps: state.ui.checkout.completedSteps,
    visitedSteps: state.ui.checkout.visitedSteps
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);