import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withRouter from 'react-router/lib/withRouter';
import { bindActionCreators } from 'redux';

import HeaderG from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import Anchor from 'grommet/components/Anchor';
import CartIcon from 'grommet/components/icons/base/Cart';
import HomeIcon from 'grommet/components/icons/base/Home';
import MenuIcon from 'grommet/components/icons/base/Menu';
import OfferIcon from 'grommet/components/icons/base/Validate';
import SearchIcon from 'grommet/components/icons/base/Search';

import './Header.module.scss';
import { config } from 'utils/Config';
import MobileHeaderItem from 'components/common/mobileHeaderItem/MobileHeaderItem';
import Location from 'containers/location/Location';
import Search from 'containers/search/Search';
import Cart from 'containers/cart/Cart';
import Account from 'containers/account/Account';
import BrowseDepartment from 'containers/browseDepartment/BrowseDepartment';
import { 
    openCartModal
} from 'containers/cart/CartActions';
import { openDepartmentModal } from 'containers/browseDepartment/BrowseDepartmentActions';
import { showSearchBox, hideSearchBox } from 'containers/search/SearchActions';

class Header extends Component {
    constructor () {
        super();
        this._onLocationChange = this._onLocationChange.bind(this);
    }
    
    componentDidMount() {
        this.deregisterLocWatch = this.props.router.listenBefore(this._onLocationChange);
    }    
    componentWillUnmount() {
        this.deregisterLocWatch();
    }
    _onLocationChange() {
        this.props.hideSearchBox();
    }

    render () {
        console.log("****Render header");
        const {
            location,
            showSearchBox
        } = this.props;
        if (this.props.showMiniHedaer) {
            return (
                <HeaderG fixed className='ps-header-widget mini' colorIndex='neutral-2' size="medium"
                    pad={{ horizontal: 'medium', between: 'small' }}>
                    <Title responsive={false}>Title</Title>
                </HeaderG>
            )
        }
        return (
        <HeaderG fixed className='ps-header-widget' colorIndex='neutral-2' size="medium"
            pad={{ horizontal: 'medium', between: 'small' }}>
                <div></div>
                <Title responsive={false}>Title</Title>
                <Box flex={true}
                    justify='between'
                    align="center"
                    direction='row'
                    responsive={false}
                    flex='grow'>
                    <div className="header-nav my-location-wrap">
                        <Location/>                   
                    </div>
                    <div className="header-nav offers-wrap">
                        <Anchor icon={<OfferIcon/>} animateIcon={false} label="Offers" path={config.offersPath}/>
                    </div>
                    <div className="header-nav browse-departments">
                        <BrowseDepartment />
                    </div>
                    <Box className="search-wrap" 
                        flex={true} alignSelf="stretch" 
                        direction="row" 
                        alignContent="stretch">
                        <Search/>
                    </Box>
                    <div className="header-nav my-account-wrap">
                        <Account/>                   
                    </div>
                    <div className="header-nav my-cart-wrap">
                        <Cart/>                   
                    </div>
                </Box>
                {
                    this.props.isMobile || this.props.isTablet ?
                        <ul className="mobile-header sticky">
                            <li>
                                <MobileHeaderItem text="Home" icon={<HomeIcon/>}
                                    path={`${config.basePath}`}
                                    isActive={location.pathname.indexOf(config.basePath) === 
                                    location.pathname.length - config.basePath.length && !showSearchBox}/>
                            </li>
                            <li>
                                <MobileHeaderItem text="Categories" icon={<MenuIcon/>} 
                                isActive={location.pathname.indexOf(config.basePath + '/') >= 0 && !showSearchBox}
                                onClick={this.props.onBrowseDepartmentClick}/>
                            </li>
                            <li>
                                <MobileHeaderItem text="Search" icon={<SearchIcon/>} 
                                isActive={showSearchBox} onClick={this.props.onSearchClick}/>
                            </li>
                            <li>
                                <MobileHeaderItem text="Offers" icon={<OfferIcon/> } 
                                path={config.offersPath}
                                isActive={location.pathname.indexOf(config.offersPath) >= 0 && !showSearchBox}/>                            
                            </li>
                            <li>
                                <MobileHeaderItem text="Cart" icon={<CartIcon/>} 
                                    badgeText={this.props.cart.count}
                                    onClick={this.props.onCartClick}/>
                            </li>
                        </ul>
                    : null
                }
        </HeaderG>
        );
    }
}

Header.PropTypes = {
    showMiniHedaer: PropTypes.bool
};

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators ({
        onCartClick: openCartModal,
        onBrowseDepartmentClick: openDepartmentModal,
        onSearchClick: showSearchBox,
        hideSearchBox
    }, dispatch) 
});
const mapStateToProps = (state) => ({
    showMiniHedaer: state.ui.header.miniHeaderMode,
    isMobile: state.browser.is.small,
    isTablet: state.browser.is.medium,
    isDesktop: state.browser.is.large,
    cart: state.data.cart,
    showSearchBox: state.data.search.showSearchBox,
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));