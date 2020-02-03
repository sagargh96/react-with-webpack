import React, { Component } from 'react';
import PropTypes from 'prop-types';

/*style*/ import './CartItems.module.scss';
import CartStoreSummary from 'components/cart/cartStoreSummary/CartStoreSummary';
import CartItem from 'components/cart/cartItem/CartItem';

//import { CartStoreSummary, CartItem } from 'components/cart';

class CartItems extends Component {
    constructor (props) {
        super(props);
    }
    render () {
        const {
            cartItems,
            onAddToCartClick,
            onRemoveFromCartClick
        } = this.props;
        if (!cartItems) {
            return null;
        }
        return (
            <div className='ps-cart-items custom-scroll-bar v-small-top1'>
                {
                    Object.keys(cartItems).map(itemId => {
                        const cartItem = cartItems[itemId];
                        return (
                            <div className='item-list' key={itemId}>
                                <CartStoreSummary cartStoreSummary={cartItem} storeDetails={cartItem.storeDetails}/> 
                                {
                                    Object.keys(cartItem.products).map(productId => {    
                                        const product = cartItem.products[productId];
                                        return Object.keys(product.productOptions).map(productOptionId => {
                                            const productOption = product.productOptions[productOptionId]
                                            return (
                                                <CartItem cartItem={product} key={productOptionId}
                                                    cartItemOption={productOption} 
                                                    onAddToCartClick={onAddToCartClick}
                                                    onRemoveFromCartClick={onRemoveFromCartClick}
                                                />
                                            )
                                        });  
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}

CartItems.PropTypes = {
    cartItems: PropTypes.object,
    onAddToCartClick: PropTypes.func,
    onRemoveFromCartClick: PropTypes.func
}

export default CartItems;