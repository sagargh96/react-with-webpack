import React from 'react';

import Sidebar from 'grommet/components/Sidebar';
import Header from 'grommet/components/Header';
import Footer from 'grommet/components/Footer';
import Title from 'grommet/components/Title';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';

/*style*/ import './NavSidebar.module.scss';
import NavControl from 'components/common/navControl/NavControl';

//import { NavControl } from 'components/common';

class NavSidebar extends React.Component {
    constructor () {
        super();
    }

    render () {
        var items = [
            {
                label: 'Login',
                path: '/login'
            },
            {
                label: 'Department',
                path: '/shop/abcd'
            },
            {
                label: 'My Orders',
                path: '/'
            },
            {
                label: 'My Cart',
                path: '/'
            },
            {
                label: 'My Wallet',
                path: '/'
            },
            {
                label: 'Re-Order',
                path: '/'
            },
            {
                label: 'Offers Zone',
                path: '/'
            }
        ];
        var links = items.map((page) => {
            return (
                <Anchor key={page.label} path={page.path} label={page.label} />
            );
        });
        return (
            <Sidebar colorIndex="neutral-1" fixed={true}>
                <Header size="small" pad={{horizontal: 'small'}} justify="between">
                    <Title a11yTitle="Close Menu">
                        <span>PuneSubji</span>
                    </Title>
                    <NavControl onNavClick={this.props.onNavSidebarClose} active={true}/>
                </Header>
                <Menu primary={true} fill={true} size='small'>
                    {links}
                </Menu>
            </Sidebar>
        );
    }
}

export default NavSidebar;