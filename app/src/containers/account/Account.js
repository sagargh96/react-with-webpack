import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { bindActionCreators } from 'redux';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import UserIcon from 'grommet/components/icons/base/User';

/*style*/ import './Account.module.scss';
//import { AccountWidget } from 'components/account';
import Modal from 'components/common/modal/Modal';
import AccountNavMenu from 'components/account/accountNavMenu/AccountNavMenu';
import Signup from 'containers/signup/Signup';
import { openAccountWidget, closeAccountWidget } from 'containers/signup/SignupActions'; 
import { openMyAccountModal, closeMyAccountModal,
         getUserContext} from './AccountActions';
import { checkZipCode } from 'containers/location/LocationAction';
import { accountInitTexts } from './messages/AccountInitTexts';

class Account extends Component {
    constructor () {
        super();
        this._onAccountClick = this._onAccountClick.bind(this);
        this._onCloseModalClicked = this._onCloseModalClicked.bind(this);
    }
    
    _onAccountClick () {
        const { 
            account, 
            onMyAccountClicked, 
            onAccountClicked 
        } = this.props;

        if (account.isAuthenticated) {
            onMyAccountClicked();
        } else {
            onAccountClicked();
        }
    }
    _onCloseModalClicked () {
        const { 
                account, 
                onCloseMyAccountModalClicked, 
                onCloseAccountModalClicked 
            } = this.props;
        if (account.isAuthenticated) {
            onCloseMyAccountModalClicked();
        } else {
            onCloseAccountModalClicked();
        }
    }

    componentDidMount () {
        if (this.props.account.isAuthenticated) {
            this.props.getUserContext();
        } else if (!this.props.store || !this.props.store.storeDetails ||
            !this.props.store.storeDetails.id) {
            this.props.checkZipCode({
                zipCode: this.props.location.zipCode,
                isDefault: this.props.location.isDefault
            });
        }
    }

    render () {
        const {
            showSignUpModal,
            showAccountNavModal,
            account
        } = this.props;
        
        return (            
            <Box>
                <Button icon={<UserIcon />}
                    className="ps-button hover-effect"
                    label={!account.isAuthenticated ? "Login/Signup" : 'My Account'}
                    onClick={this._onAccountClick}
                    plain={true} size='small' fill={false}/>
                {
                    !account.isAuthenticated ?
                    <Modal
                        isOpen={showSignUpModal}
                        closer
                        contentLabel='Signup Modal'
                        shouldCloseOnOverlayClick={true}
                        className="ps-account-widget custom-scroll-bar"
                        onCloseClick={this._onCloseModalClicked}>
                        <Signup isLocationHeader={true} 
                            initText={accountInitTexts.signUpTexts}/>
                    </Modal> :
                    <Modal
                        isOpen={showAccountNavModal}
                        align='right'
                        isInvert={true}
                        closer
                        contentLabel='Account Modal'
                        shouldCloseOnOverlayClick={true}
                        className="account-nav-modal"
                        account={account}
                        overlayClassName='modal-overlay'
                        onCloseClick={this._onCloseModalClicked}>
                        <AccountNavMenu account={account}/>
                    </Modal>
                }
            </Box>
        )
    }
}

Account.PropTypes = {
    showSignUpModal: PropTypes.boolean,
    isAuthenticated: PropTypes.boolean,
    location: PropTypes.obj,
    onAccountClick: PropTypes.func,
    checkZipCode: PropTypes.func
};

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators ({
        getUserContext: getUserContext,
        onAccountClicked: openAccountWidget,
        onCloseAccountModalClicked: closeAccountWidget,
        onMyAccountClicked: openMyAccountModal,
        onCloseMyAccountModalClicked: closeMyAccountModal,
        checkZipCode: checkZipCode
    }, dispatch)
});

const mapStateToProps = (state) => ({
    showSignUpModal: state.ui.signup.showSignUpModal,
    showAccountNavModal: state.data.account.showAccountNavModal,
    store: state.data.store,
    location: {
        zipCode: state.data.location.zipCode,
        isDefault: state.data.location.isDefault
    },
    account: {
        isAuthenticated: state.data.account.isAuthenticated,
        firstName: state.data.account.firstName,
        lastName: state.data.account.lastName,
        emailId: state.data.account.username
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Account);