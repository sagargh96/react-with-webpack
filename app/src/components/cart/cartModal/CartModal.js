import React, { Component } from 'react';
import PropTypes from 'prop-types';

/*style*/ import './CartModal.module.scss';
import Modal from 'components/common/modal/Modal';
import IsolatedScroll from 'components/common/isolatedScroll/IsolatedScroll';
import CartHeader from 'components/cart/cartHeader/CartHeader';
import CartItems from 'components/cart/cartItems/CartItems';
import CartFooter from 'components/cart/cartFooter/CartFooter';

/*import { Modal, IsolatedScroll } from 'components/common';
import {  CartHeader, CartItems, CartFooter } from 'components/cart';*/

class CartModal extends Component {
    constructor () {
        super ();
    }
    render () {
        const {
            cart,
            isOpen,
            onCartClick,
            onCloseClick,
            onAddToCartClick,
            onRemoveFromCartClick,
            onCheckoutClick
        } = this.props;
        return (
            <Modal
                isOpen={isOpen}
                align='right'
                closer
                contentLabel='Modal'
                shouldCloseOnOverlayClick={true}
                className="ps-cart-modal"
                overlayClassName='modal-overlay'
                onCloseClick={onCloseClick}>
                    <div className='cart-modal-content'>
                        <div className='cart-wrapper'>
                            <div className='cart-header'>
                                <CartHeader title='My Cart' itemCount={cart.count}/>
                            </div>
                            <IsolatedScroll className='cart-body custom-scroll-bar'>
                                    <CartItems cartItems={cart.items} 
                                        onAddToCartClick={onAddToCartClick}
                                        onRemoveFromCartClick={onRemoveFromCartClick}/>
                            </IsolatedScroll>
                            <div className='cart-footer'>
                                <CartFooter totalAmount={cart.amount} onCheckoutClick={onCheckoutClick}/>
                            </div>
                        </div>
                    </div>
            </Modal>
        );
    }
}

CartModal.PropTypes = {
    cart: PropTypes.object.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onCartClick: PropTypes.func,
    onCloseClick: PropTypes.func,
    onAddToCartClick: PropTypes.func,
    onRemoveFromCartClick: PropTypes.func,
    onCheckoutClick: PropTypes.func
}

export default CartModal;