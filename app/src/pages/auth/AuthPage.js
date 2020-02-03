import React, { Component } from 'react';
import {parseQueryString} from 'utils/helpers';

import Signup from 'containers/signup/Signup';
import { signUpInitTexts } from './messages/signUpInitTexts';
//import 'styles/styles.scss';
import './AuthPage.module.scss';

class AuthPage extends Component {
	render() {
		const queryParamString = this.props.location.search;
		const queryParams = parseQueryString(queryParamString);
		const redirectUrl = queryParams ? queryParams['redirectUrl'] : null;

		return (
            <div className="auth-page">
                <div className="container">
                    <Signup redirectUrl={redirectUrl}
                        initText={signUpInitTexts}
                    />
                </div>
            </div>
		);
	}
}

export default AuthPage;