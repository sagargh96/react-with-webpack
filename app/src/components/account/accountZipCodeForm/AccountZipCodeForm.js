import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Form from 'react-formify';

import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import FormFields from 'grommet/components/FormFields';
import FormField from 'grommet/components/FormField';
import Footer from 'grommet/components/Footer';
import Anchor from 'grommet/components/Anchor';

/*style*/ import './AccountZipCodeForm.module.scss';
import OrSeparator from 'components/common/orSeparator/OrSeparator';
import Alert from 'components/common/alert/Alert';
import ButtonWithSpinner from 'components/common/buttonWithSpinner/ButtonWithSpinner';
import {buildValidationRules} from 'utils/validationRules';

//import { ButtonWithSpinner } from 'components/common';

class AccountZipCodeForm extends Component {
    constructor(props) {
        super(props);
        this._onSubmit = this._onSubmit.bind(this);
        this.validationRules = buildValidationRules({
            zipCode: [{
                rule: 'required',
                message: 'Zip code is required'
            }]
        });
    }
    _onSubmit(checkZipCodeForm) {
        this.props.onSubmit({
            zipCode: checkZipCodeForm.zipCode
        })
    }

    render() {
        const { 
            onSignInClicked, 
            headingText, 
            subHeadingText, 
            submitBtnText, 
            notAvailable,
            inProgress,
            zipCode,
            errors,
            defaultLocationLink
        } = this.props;
        return (
            <div className="ps-account-zipcode-form ps-form">
                <Heading tag="h1" margin="none" strong={true} align="center">
                    {headingText}
                </Heading>
                {subHeadingText ?
                    <div className="sub-heading align-center">10% discount on your first order.</div>
                : ''}
                
                {errors ? 
                    <div className='v-normal-top'>
                    <Alert type="error" 
                        text={`${errors[0]}`}/>
                    </div>
                    : ''
                }
                <Form onSubmit={inProgress ? ()=>null : this._onSubmit} 
                rules={this.validationRules}>
                    {(state, errors) => (
                        <div>
                            <FormFields className='v-normal'>
                                <fieldset>
                                    <FormField label="Enter zip code" htmlFor="zipCode" error={errors.zipCode}>
                                        <input id="zipCode" name={"zipCode"} type="text"
                                            {...state.zipCode} />
                                    </FormField>
                                </fieldset>
                            </FormFields>
                            <Footer className='v-small-top'>
                                <ButtonWithSpinner label={submitBtnText}
                                    type='submit'
                                    fill={true}
                                    primary={true}
                                    onClick={inProgress ? null : ()=>null}
                                    />
                            </Footer>
                        </div>
                    )}
                </Form>

                
                {
                    defaultLocationLink ?
                    <div>
                        <OrSeparator className='v-small' text="Or"/>
                        <div className="default-location-option">
                            <Anchor label={defaultLocationLink.text} 
                                            onClick={defaultLocationLink.action}/>
                        </div>
                    </div>
                    : null
                }
                {
                    onSignInClicked ? 
                    <div className="sign-up-option v-normal-top">
                        <ul>
                            <li>Already have an account? <Anchor label="Sign in"
                                    onClick={onSignInClicked}/></li>
                        </ul>
                    </div>: ''
                }
                
            </div>
        )
    }
}

AccountZipCodeForm.PropTypes = {
    headingText: PropTypes.string.isRequired, 
    subHeadingText: PropTypes.string, 
    submitBtnText: PropTypes.string.isRequired,
    zipCode: PropTypes.string,
    onSubmit: PropTypes.func,
    onSignInClicked: PropTypes.func,
    inProgress: PropTypes.bool,
    notAvailable: PropTypes.bool,
    defaultLocationLink: PropTypes.obj
}

export default AccountZipCodeForm;