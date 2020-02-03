import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from 'components/common/avatar/Avatar';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';

import OrderListIcon from 'grommet/components/icons/base/DocumentText';
import LogoutIcon from 'grommet/components/icons/base/Logout';
import AddressesIcon from 'grommet/components/icons/base/MapLocation';
import InviteFriend from 'grommet/components/icons/base/UserNew';
import Money from 'grommet/components/icons/base/Money';

/*style*/ import './AccountNavMenu.module.scss';

class AccountNavMenu extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            account
        } = this.props;
        return (
            <div className="ps-account-nav-menu">
                <div className="account-details">
                    <div className="user-avatar">
                        <Avatar link="" text='RK'/>
                    </div>
                    <div className='user-details'>
                        <h4>{account.firstName} {account.lastName}</h4>
                        <div className='secondary-text small'>
                            {account.emailId}
                        </div>
                    </div>
                </div>
                <Menu responsive={false}
                    className="account-nav"
                    primary={true}
                    size="large">
                        <Anchor className="account-nav-item"
                            path="" icon={<OrderListIcon/>} label="My Account">
                        </Anchor>
                        <Anchor className="account-nav-item"
                            path="" icon={<OrderListIcon/>} label="My Orders">
                        </Anchor>
                        <Anchor className="account-nav-item" label="My Addresses"
                            path="" icon={<AddressesIcon/>}>
                        </Anchor>
                        <Anchor className="account-nav-item" label="Invite Friends"
                            path="" icon={<InviteFriend/>}>
                        </Anchor>
                        <Anchor className="account-nav-item" label="Wallet"
                            path="" icon={<Money/>}>
                        </Anchor>
                        <Anchor className="account-nav-item" label="Logout"
                            path="" icon={<LogoutIcon/>}>
                        </Anchor>
                </Menu>

            </div>
        )
    }
}

AccountNavMenu.PropTypes = {
    account: PropTypes.obj
}

export default AccountNavMenu;