import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import Box from 'grommet/components/Box';

/*style*/ import './ProductOption.module.scss';
import CartItemAddRemoveBtn from 'components/cart/cartItemAddRemoveBtn/CartItemAddRemoveBtn';

class ProductOption extends Component {
    render () {
        const {
            productOption,
            uom,
            selectedProductOption,
            cartCount,
            onAddToCartClick,
            onRemoveFromCartClick
        } = this.props;
        const _productOption = {
            ...productOption,
            ...productOption.productOptionStoreList[0]
        }
        return (
            <div className="ps-product-option">
                <div className="quantity primary-text">
                    {productOption.qty} {uom}
                </div>
                <Box direction='row' flex='grow' responsive={false} justify='between'>
                    <Box className="pricing">
                        <div>
                            {
                                _productOption.oldPrice < _productOption.price ?                                         
                                (<span className='product-old-price'>₹{_productOption.oldPrice}</span>):
                                null
                            }
                            <span>
                                <span className='product-new-price primary-text'>₹{_productOption.price}</span>
                            </span>
                        </div>
                    </Box>
                    <Box alignSelf='center'>
                        <CartItemAddRemoveBtn 
                            itemCount={cartCount || 0}
                            itemInventory={_productOption.stockQty}
                            onIncCartItemCountClick={() => {
                                onAddToCartClick(_productOption);
                            }}
                            onDecCartItemCountClick={() => {
                                onRemoveFromCartClick(_productOption);
                            }}
                        />
                    </Box>
                </Box>
            </div>
        );
    }
}

ProductOption.PropTypes = {
    productOption: PropTypes.object.isRequired,
    product: PropTypes.object.isRequired,
    cartCount: PropTypes.number,
    onAddToCartClick: PropTypes.func.isRequired,
    onRemoveFromCartClick: PropTypes.func.isRequired
}

export default ProductOption;