import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-formify';

import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import FormFields from 'grommet/components/FormFields';
import FormField from 'grommet/components/FormField';
import Footer from 'grommet/components/Footer';
import Anchor from 'grommet/components/Anchor';

import styles from './AccountSignInForm.module.scss';

import OrSeparator from 'components/common/orSeparator/OrSeparator';
import Alert from 'components/common/alert/Alert';
import SocialAuthButton from 'components/common/socialAuthButton/SocialAuthButton';
import ButtonWithSpinner from 'components/common/buttonWithSpinner/ButtonWithSpinner';
import {buildValidationRules} from 'utils/validationRules';

//import { OrSeparator, ButtonWithSpinner } from 'components/common';

class AccountSignInForm extends Component {
    constructor(props) {
        super(props);
        this._onSubmit = this._onSubmit.bind(this);
        this._renderSocialLogin = this._renderSocialLogin.bind(this);

        this.validationRules = buildValidationRules({
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
            password: [{
                rule: 'required',
                message: 'Password is required'
            }]
        });
    }

    _onSubmit(signInForm) {
        this.props.onSignInSubmit({
            emailId: signInForm.emailId,
            password: signInForm.password
        }, this.props.redirectUrl);
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
            onSignUpClicked,
            signInStatus, 
            signInErrorMsg,
            headingText,
            subHeadingText
        } = this.props;
        return (
            <div className="ps-account-signin-form ps-form">
                {
                    headingText ? 
                    <Heading tag="h1" margin="none" strong={true} align="center">
                        {headingText}
                    </Heading>
                    : ''
                }
                {
                    subHeadingText ? 
                    <div className="sub-heading align-center">{subHeadingText}</div>
                    : ''
                }
                
                {
                    signInStatus === "error" ? 
                    <div className='v-normal-top'>
                    <Alert type="error" 
                        text={`${signInErrorMsg}`}/>
                    </div>
                    : ''
                }
                <Form onSubmit={this.props.signInStatus === 'inProgress' ? () => null : this._onSubmit} 
                    rules={this.validationRules}>
                    {(state, errors) => (
                        <div>
                            <FormFields className='v-normal-top'>
                                <fieldset>
                                    <FormField label="Email address" htmlFor="emailId" error={errors.emailId}>
                                        <input id="emailId" type="text" {...state.emailId}/>
                                    </FormField>
                                    <FormField label="Password" htmlFor="password" error={errors.password}>
                                        <input id="password" type="password" {...state.password}/>
                                    </FormField>
                                </fieldset>
                            </FormFields>
                            <Footer className='v-small-top'>
                                <ButtonWithSpinner label='Login'
                                    type='submit'
                                    fill={true}
                                    primary={true}
                                    onClick={this.props.signInStatus === 'inProgress' ? null : ()=>null} />
                            </Footer>
                        </div>
                    )}
                </Form>
                <OrSeparator className='v-small' text="Or login with"/>
                {
                    this._renderSocialLogin()
                }                
                <div className="sign-up-option">
                    <ul>
                        <li>Don't have an account? <Anchor label="Sign up"
                                    href="#" onClick={onSignUpClicked}/></li>
                        <li>Forgot your password? <Anchor label="Reset it"
                                    onClick={() => {return null}}/></li>
                    </ul>
                </div>
            </div>
        )
    }
}

AccountSignInForm.PropTypes = {
    emailId: PropTypes.string,
    onSignInSubmit: PropTypes.func.required,
    onSignUpClicked: PropTypes.func.required,
    inProgress: PropTypes.bool,
    socialAuthGoogleUrl: PropTypes.string,
    socialAuthFacebookUrl: PropTypes.string,
    redirectUrl: PropTypes.string
}

export default AccountSignInForm;