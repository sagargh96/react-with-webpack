import React, { Component } from 'react';
import PropTypes from 'prop-types';

/*style*/ import './AccountWidget.module.scss';

import AccountSignInForm from 'components/account/accountSignInForm/AccountSignInForm';
import AccountSignUpForm from 'components/account/accountSignUpForm/AccountSignUpForm';
import Modal from 'components/common/modal/Modal';

/*import { Modal } from 'components/common';
import { AccountSignInForm, AccountSignUpForm } from 'components/account';*/

class AccountWidget extends Component {
    constructor (props) {
        super(props);
        this._renderForm = this._renderForm.bind(this);
    }
    _renderForm () {
        const { formType, onSignInSubmit, onSignUpClicked, 
                onSignUnSubmit, onSignInClicked} = this.props;
        if (formType === 'SIGN_IN') {
            return (
                <AccountSignInForm onSignInSubmit={onSignInSubmit} 
                onSignUpClicked={onSignUpClicked} />
            );
        } else if (formType === 'SIGN_UP') {
            return (<AccountSignUpForm onSignUpSubmit={onSignUnSubmit} 
            onSignInClicked={onSignInClicked} />)
        }
    }

    render () {
        const widgetForm = this._renderForm();
        const { isOpen, onCloseModalClicked } = this.props;
        return (
            <Modal
                isOpen={isOpen}
                closer
                contentLabel='Modal'
                shouldCloseOnOverlayClick={true}
                className="ps-account-widget-modal custom-scroll-bar"
                onCloseClick={onCloseModalClicked}>
                    {widgetForm}
            </Modal>
        );
    }
}

AccountWidget.PropTypes = {
    formType: PropTypes.string.required,
    onSignInSubmit: PropTypes.func.required,
    onSignUpClicked: PropTypes.func.required,
    onSignUpSubmit: PropTypes.func.required,
    onSignInClicked: PropTypes.func.required,
    onCloseModalClicked: PropTypes.func.required
};

export default AccountWidget;

