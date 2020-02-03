import React, { Component } from 'react';
import {parseQueryString} from 'utils/helpers';

class SocialAuthSuccessPage extends Component {
	render() {
		const queryParamString = this.props.location.search;
		const queryParams = parseQueryString(queryParamString);
		window.opener.socialLoginSuccessful(queryParams['token']);
		window.close();
		return (
			<div className="ps-socail-auth-success-page">
				Login successful
			</div>
		);
	}
}

export default SocialAuthSuccessPage;