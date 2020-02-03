import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-formify';

import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import FormFields from 'grommet/components/FormFields';
import FormField from 'grommet/components/FormField';
import Footer from 'grommet/components/Footer';
import Anchor from 'grommet/components/Anchor';

import styles from './AccountSignUpForm.module.scss';

import OrSeparator from 'components/common/orSeparator/OrSeparator';
import SocialAuthButton from 'components/common/socialAuthButton/SocialAuthButton';
import ButtonWithSpinner from 'components/common/buttonWithSpinner/ButtonWithSpinner';
import {buildValidationRules} from 'utils/validationRules';

//import { OrSeparator, ButtonWithSpinner } from 'components/common';

class AccountSignUpForm extends Component {
    constructor(props) {
        super(props);
        this._onSubmit = this._onSubmit.bind(this);
        this._renderSocialLogin = this._renderSocialLogin.bind(this);

        this.validationRules = buildValidationRules({
            firstName: [{
                rule: 'required',
                message: 'Required'
            }],
            lastName: [{
                rule: 'required',
                message: 'Required'
            }],
            emailId: [
                {
                    rule: 'required',
                    message: 'Email address is required'
                },
                {
                    rule: 'emailId',
                    message: 'Enter valid email address'
                },
            ],
            phoneNumber: [
                {
                    rule: 'required',
                    message: 'Mobile number is required'
                },
                {
                    rule: 'indianMobileNum',
                    message: 'Enter valid mobile number'
                },
            ],
            password: [{
                rule: 'required',
                message: 'Password is required'
            }]
        });
    }
    _onSubmit(signUpForm) {
        this.props.onSignUpSubmit(signUpForm, this.props.redirectUrl);
    }

    _renderSocialLogin() {
        if (this.props.socialAuthGoogleUrl || this.props.socialAuthFacebookUrl) {
            return (
                <div className="social-auth-login v-small row">
                    {this.props.socialAuthGoogleUrl ? 
                    (<div className="columns small-6"><SocialAuthButton label='Google'
                        authUrl={this.props.socialAuthGoogleUrl} type='google' 
                        target='_blank'/>
                    </div>) : null}
                    

                    {this.props.socialAuthFacebookUrl ? 
                    (<div className="columns small-6"><SocialAuthButton label='Facebook'
                        authUrl={this.props.socialAuthFacebookUrl} type='facebook'
                        target='_blank'/>
                    </div>) : null}
                </div>
            )
        }
    }

    render() {
        const { 
            onSignInClicked,
            onShopNowClick,
            location,
            basePath,
            headingText,
            subHeadingText
        } = this.props;
        return (
            <div className="ps-account-signup-form ps-form">
                <div>
                    { 
                        headingText ?
                        <Heading tag="h1" margin="none" strong={true} align="center">
                            {headingText}
                        </Heading>
                        : ""
                    }
                    {
                        subHeadingText ?
                        <div className="sub-heading align-center">
                            {subHeadingText}
                        </div>
                        : ""
                    }
                </div>
                <Form onSubmit={this._onSubmit} rules={this.validationRules}>
                    {(state, errors) => (
                    <div className="grommetux-form grommetux-form--plain">
                    <FormFields className='v-normal-top'>
                        <fieldset>
                            <FormFields key="fullName">
                                <FormField label="First Name" size="medium" htmlFor="firstName" error={errors.firstName}>
                                    <input id="firstName"type="text" {...state.firstName} />
                                </FormField>                                
                                <FormField label="Last Name" size="medium" htmlFor="lastName" error={errors.lastName}>
                                    <input id="lastName" type="text" {...state.lastName}/>
                                </FormField>
                            </FormFields>                                
                            <FormField label="Mobile Number" htmlFor="phoneNumber" error={errors.phoneNumber}>
                                <input id="phoneNumber" type="text" {...state.phoneNumber}/>
                            </FormField>
                            <FormField label="Email address" htmlFor="emailId" error={errors.emailId}>
                                <input id="emailId" type="text" {...state.emailId} />
                            </FormField>
                                <FormField label="Password" htmlFor="password" error={errors.password}>
                                    <input id="password" type="password" {...state.password} />
                            </FormField>
                        </fieldset>
                    </FormFields>
                    <Footer className='v-small-top'>
                        <ButtonWithSpinner label='Sign up with email'
                            type='submit'
                            primary={true}
                            fill={true}
                            onClick={user => null}/>
                    </Footer>
                    </div>
                    )}
                </Form>
                <OrSeparator className='v-small' text="Or sign-up with"/>
                {this._renderSocialLogin()} 
                <div className="sign-up-option">
                    <ul>
                        <li>Already have an account? <Anchor label="Sign in"
                                    onClick={onSignInClicked}/></li>
                    </ul>
                    <ul>
                        <li>Sign up later?
                            {
                            onShopNowClick ? 
                            <Anchor label="Shop now"
                                    path={`${basePath}`} onClick={onShopNowClick}/>
                            :<Anchor label="Shop now"
                                    path={`${basePath}`}/>
                            }
                        </li>                                    
                    </ul>
                </div>
                <div className="terms-n-conditions v-normal-top">
                    <span>By signing up, you agree to</span><br/>
                    <span><Anchor label="Terms of Service"
                                    onClick={onSignInClicked}/> and <Anchor label="Privacy Policy"
                                    onClick={onSignInClicked}/></span>
                </div>
               
            </div>
        )
    }
}

AccountSignUpForm.PropTypes = {
    headingText: PropTypes.string,
    subHeadingText: PropTypes.string,
    emailId: PropTypes.string,
    onSignUpSubmit: PropTypes.func,
    onSignInClicked: PropTypes.func,
    onShopNowClick: PropTypes.func,
    inProgress: PropTypes.func,
    location: PropTypes.object,
    basePath: PropTypes.string
}

export default AccountSignUpForm;