import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
/*style*/ import './Signup.module.scss';
import AccountZipCodeForm from 'components/account/accountZipCodeForm/AccountZipCodeForm';
import AccountSignInForm from 'components/account/accountSignInForm/AccountSignInForm';
import AccountSignUpForm from 'components/account/accountSignUpForm/AccountSignUpForm';
import { 
    changeSignUpStep, 
    signInToAccount, 
    signUpAccount, 
    shopNowClick, 
    redirectToStoreHome } from './SignupActions';
import { checkZipCode, downloadTnC } from 'containers/location/LocationAction';
import { config } from "utils/Config";
import Anchor from 'grommet/components/Anchor';

class Signup extends Component {
    constructor (props) {
        super(props);
        this._renderSignStep = this._renderSignStep.bind(this);
        this._onChangeSignUpStep = this._onChangeSignUpStep.bind(this);
        this._getSignUpHeadingAndSubHeading = this._getSignUpHeadingAndSubHeading.bind(this);
    }

    componentDidMount() {
        let nextStep = 'ZIP_CODE';
        if (this.props.location.isDefault) {
            nextStep = 'ZIP_CODE'
        } else if (!this.props.account.isAuthenticated) {
            nextStep = 'SIGN_IN';
        } else if (this.props.isLandingPageOverlay){
            this.props.redirectToStoreHome();
        }
        this.props.onChangeSignUpStep(nextStep);
    }

    _onChangeSignUpStep (nextStep) {
        if (!this.props.location.isDefault && nextStep === 'ZIP_CODE') {
            nextStep = 'SIGN_UP';
        }
        this.props.onChangeSignUpStep(nextStep);
    }
    _getSignUpHeadingAndSubHeading () {
        const checkZipCodeErrors = this.props.checkZipCodeErrors;
        const location = this.props.location;
        const signUpFormText = this.props.initText.signUpFormText;
        let signUpHeadingAndSubHeading = {};
        if (this.props.isLocationHeader) {
            if (checkZipCodeErrors && checkZipCodeErrors[0].code === 'NOT_AVAILABLE') {
                signUpHeadingAndSubHeading.heading = signUpFormText.locationNotAvlHeading + location.locality; //"We're not available in "
                signUpHeadingAndSubHeading.subHeading = signUpFormText.locationNotAvlSubHeading; //"Signup and we will update you once we available in your area.";
            } else {
                signUpHeadingAndSubHeading.heading = signUpFormText.locationAvlHeading + location.locality; //"We're available in "
                signUpHeadingAndSubHeading.subHeading = signUpFormText.locationAvlSubHeading;
                    //"<span className='highlight-text bold'>10% discount</span> on your first order."
                    //"10% discount on your first order.";
            }
            return signUpHeadingAndSubHeading;
        }        
        signUpHeadingAndSubHeading.heading = signUpFormText.heading;
        signUpHeadingAndSubHeading.subHeading = signUpFormText.subHeading;
        return signUpHeadingAndSubHeading;
    }    
    _renderSignStep (step) {
        const {
            onZipCodeSubmit,
            onSignInSubmit,
            onSignUpSubmit,
            onShopNowClick,
            signInStatus,
            signInErrorMsg,
            checkZipCodeStatus,
            checkZipCodeErrors,
            zipCode,
            location,
            redirectUrl          
        } = this.props;
        console.log('signinstatus: ' + signInStatus);
        if (step === 'ZIP_CODE') {
            const zipCodeFormText = this.props.initText.zipCodeFormText || {};
            return (<AccountZipCodeForm 
                        onSubmit={onZipCodeSubmit} 
                        onSignInClicked={() => this._onChangeSignUpStep('SIGN_IN')}
                        inProgress={checkZipCodeStatus === 'inProgress'? true : false}
                        headingText={zipCodeFormText.headingText} //'Buy your groceries online'
                        subHeadingText={zipCodeFormText.subHeadingText} //'10% discount on your first order.'
                        submitBtnText={zipCodeFormText.submitBtnText}/>); //'Find Store'
        }
        if (step === 'SIGN_IN') {
            const signInFormText = this.props.initText.signInFormText || {};
            return (<AccountSignInForm 
                onSignInSubmit={onSignInSubmit}
                headingText={signInFormText.headingText} //"Welcome Back!"
                subHeadingText={signInFormText.subHeadingText} //"Login with your email and password."
                redirectUrl={redirectUrl} 
                onSignUpClicked={() => this._onChangeSignUpStep('ZIP_CODE')} 
                signInStatus={signInStatus}
                signInErrorMsg={signInErrorMsg}
                socialAuthGoogleUrl={`${config.serverUrl}/oauth2/authorization/google`} 
                socialAuthFacebookUrl={`${config.serverUrl}/oauth2/authorization/facebook`}/>);
        }
        if (step === 'SIGN_UP') {
            const signUpHeadingSubHeading = this._getSignUpHeadingAndSubHeading();
            return (<AccountSignUpForm 
                onSignUpSubmit={onSignUpSubmit} 
                onSignInClicked={() => this._onChangeSignUpStep('SIGN_IN')}
                onShopNowClick={onShopNowClick}
                headingText={signUpHeadingSubHeading.heading}
                subHeadingText={signUpHeadingSubHeading.subHeading}
                basePath={config.basePath}
                redirectUrl={redirectUrl}
                socialAuthGoogleUrl={`${config.serverUrl}/oauth2/authorization/google`} 
                socialAuthFacebookUrl={`${config.serverUrl}/oauth2/authorization/facebook`}/>);
        }
    }
    render () {
        const {
            step,
        } = this.props;
        
        const signupStep = this._renderSignStep(step);
        return (
            <div className='ps-signup-widget'>
                { signupStep }
				<Anchor label={'Download Terms and conditions'} 
                                            onClick={this.props.downloadTnC}/>
            </div>

        )
    }
}

Signup.PropTypes = {
    step: PropTypes.string,
    signInStatus: PropTypes.string,
    signInErrorMsg: PropTypes.string,
    checkZipCodeStatus: PropTypes.string,
    checkZipCodeErrors: PropTypes.obj,
    zipCode: PropTypes.string,
    location: PropTypes.obj,
    account: PropTypes.obj,
    isLandingPageOverlay: PropTypes.boolean,
    onZipCodeSubmit: PropTypes.func,
    onSignInSubmit: PropTypes.func,
    onSignUpSubmit: PropTypes.func,
    onShopNowClick: PropTypes.func,
    onChangeSignUpStep: PropTypes.func,
    redirectToStoreHome: PropTypes.func
}


const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators ({
        onZipCodeSubmit: checkZipCode,
        onSignInSubmit: signInToAccount,
        onSignUpSubmit: signUpAccount,
        onShopNowClick: shopNowClick,
        onChangeSignUpStep: changeSignUpStep,
		redirectToStoreHome: redirectToStoreHome,
		downloadTnC: downloadTnC
    }, dispatch)
});

const mapStateToProps = (state) => ({
    step: state.ui.signup.step,
    signInStatus: state.ui.signup.signInStatus,
    signInErrorMsg: state.ui.signup.signInErrorMsg,
    checkZipCodeStatus: state.ui.location.checkZipCodeStatus,
    checkZipCodeErrors: state.ui.location.error,
    zipCode: state.ui.location.zipCode,
    location: {
        isDefault: state.data.location.isDefault,
        locality: state.data.location.locality
    },
    account: state.data.account,
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);