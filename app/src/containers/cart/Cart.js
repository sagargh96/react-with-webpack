import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Button from 'grommet/components/Button';
import Box from 'grommet/components/Box';
import CartIcon from 'grommet/components/icons/base/Cart';

/*style*/ import './Cart.module.scss';
import NumberBadge from 'components/common/numberBadge/NumberBadge';
import CartModal from 'components/cart/cartModal/CartModal';
//import { NumberBadge } from 'components/common';
//import { CartModal } from 'components/cart';
import { 
        openCartModal, 
        closeCartModal,
        addItemToCart,
        removeItemFromCart,
        checkoutCart } from './CartActions';

class Cart extends Component {
    constructor () {
        super();
    }
    render () {
        const {
            cart,
            isModalOpen,
            onCartClick,
            onCloseClick,
            onAddToCartClick,
            onRemoveFromCartClick,
            onCheckoutClick
        } = this.props;
        const cartCount = (
            <span>
                <span>₹{cart.amount}</span>
            </span>
        );
        return (            
            <Box className="ps-cart-widget">
                <div className='cart-count'>
                    <NumberBadge>{cart.count}</NumberBadge>
                </div>
                <Button icon={<CartIcon />}
                    className="ps-button hover-effect"
                    label={cart.count > 0 ? cartCount : (<span>My Cart</span>)}
                    onClick={onCartClick}
                    plain={true} size='small' fill={false}/>
                <CartModal cart={cart} isOpen={isModalOpen}
                    onCartClick={onCartClick} onCloseClick={onCloseClick} 
                    onAddToCartClick={onAddToCartClick} 
                    onRemoveFromCartClick={onRemoveFromCartClick}
                    onCheckoutClick={onCheckoutClick}/>
            </Box>
        )
    }
}

Cart.PropTypes = {
    cart: PropTypes.object.isRequired,
    onCartClick: PropTypes.func,
    onCloseClick: PropTypes.func,
    onAddToCartClick: PropTypes.func,
    onRemoveFromCartClick: PropTypes.func,
    onCheckoutClick: PropTypes.func
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators ({
        onCartClick: openCartModal,
        onCloseClick: closeCartModal,
        onAddToCartClick: addItemToCart,
        onRemoveFromCartClick: removeItemFromCart,
        onCheckoutClick: checkoutCart
    }, dispatch)
});

const mapStateToProps = (state) => ({
    cart: state.data.cart,
    isModalOpen: state.ui.cart.isModalOpen
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);