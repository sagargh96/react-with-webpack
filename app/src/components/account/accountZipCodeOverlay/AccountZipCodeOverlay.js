import React, { Component } from 'react';
import PropTypes from 'prop-types';

/*style*/ import './AccountZipCodeOverlay.module.scss';

import AccountZipCodeForm from 'components/account/accountZipCodeForm/AccountZipCodeForm';

//import { AccountZipCodeForm } from 'components/account';

class AccountZipCodeOverlay extends Component {
    constructor (props) {
        super(props);
    }

    render () {
        const {
            onZipCodeSubmit,
            onSignInClicked
        } = this.props;
        return (
            <div className='ps-account-zipcode-overlay'>
                <div className='table'>
                    <div className='table-cell'>
                        <div className='overlay-content'>
                            <div className='form-wrapper'>
                                <AccountZipCodeForm onSubmit={onZipCodeSubmit} 
                                onSignInClicked={onSignInClicked} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

AccountZipCodeOverlay.PropTypes = {
    onZipCodeSubmit: PropTypes.func.required,
    onSignInClicked: PropTypes.func.required
};

export default AccountZipCodeOverlay;