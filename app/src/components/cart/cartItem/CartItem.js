import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

import Spinning from 'grommet/components/icons/Spinning';
import Box from 'grommet/components/Box';
import Label from 'grommet/components/Label';

/*style*/ import './CartItem.module.scss';
import ImageLazyLoader from 'components/common/imageLazyLoader/ImageLazyLoader';
import CartItemAddRemoveBtn from 'components/cart/cartItemAddRemoveBtn/CartItemAddRemoveBtn';
import prodImg from 'images/prod_img_2.jpg';

/*import { ImageLazyLoader } from 'components/common';
import { CartItemAddRemoveBtn } from 'components/cart';*/

class CartItem extends Component {
    constructor () {
        super ();
    }
    render () {
        const {
            cartItem,
            cartItemOption,
            onAddToCartClick,
            onRemoveFromCartClick
        } = this.props
        const cartItemOptionWithPrice = {
            ...cartItemOption,
            //...cartItemOption.productOptionStoreList[0]
        }
        return (
            <div className='ps-cart-item'>
                <Box flex={true}
                    justify='start'
                    align="center"
                    direction='row'
                    responsive={false}
                    flex='grow'>
                    <Box alignSelf='center'>
                        <div className='product-img-wrapper'>
                            <ImageLazyLoader src={prodImg} 
                                preLoader='{()=><Spinning/>}'>
                                <span className='secondary-text'>{cartItem.name} image</span>
                            </ImageLazyLoader>
                        </div>
                    </Box>
                    
                    <Box alignSelf='start' flex='grow'>
                        <div className="product-details-wrapper">
                            <div>
                                <span className='primary-text'>{cartItem.name} </span>
                                <span className='secondary-text'>{cartItemOption.qty} {cartItem.uom}</span>
                            </div>
                            <Box flex='grow' direction='row' align='center' 
                                className='v-xsmall-top' responsive={false}>
                                <Box flex='grow' direction='row' align='center' responsive={false}>
                                    <CartItemAddRemoveBtn itemCount={cartItemOption.count}
                                        itemQty={cartItemOption.qty}
                                        itemInventory={cartItemOption.stockQty}
                                        onIncCartItemCountClick={() => {
                                            onAddToCartClick(cartItem, cartItemOptionWithPrice);
                                        }}
                                        onDecCartItemCountClick={() => {
                                            onRemoveFromCartClick(cartItem, cartItemOptionWithPrice);
                                        }}
                                    />
                                    <Label className='secondary-text item-price'>X ₹{cartItemOptionWithPrice.price}</Label>
                                </Box>
                                <div className='item-subtotal'>
                                    <Label className='primary-text'>₹{cartItemOptionWithPrice.subTotal}</Label>
                                </div>
                            </Box>                   
                        </div>
                    </Box>
                </Box>
            </div>
        );
    }
}

CartItem.PropTypes = {
    cartItem: PropTypes.object.isRequired,
    cartItemOption: PropTypes.object.isRequired,
    onAddToCartClick: PropTypes.func,
    onRemoveFromCartClick: PropTypes.func
}

export default CartItem;