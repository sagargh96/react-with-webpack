import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import ImageLazyLoader from 'components/common/imageLazyLoader/ImageLazyLoader';
import ProductOption from 'components/product/productOption/ProductOption';

class ProductOptionList extends Component {
    render () {
        const {
            selectedProductOption,
            productOptions,
            uom,
            productOptionsInCart,
            onAddToCartClick,
            onRemoveFromCartClick
        } = this.props;

        return (
            <div className="ps-product-option-list">
                {
                    productOptions.map((productOption, index) => {
                        let productOptionInCart = null;
                        if (productOptionsInCart) {
                            productOptionInCart = productOptionsInCart[productOption.id];
                        }
                        const cartCount = productOptionInCart && productOptionInCart.count;
                        return (
                            <div className='list-item' key={index}>
                                <ProductOption selectedProductOption={selectedProductOption}
                                    cartCount={cartCount}
                                    uom={uom} 
                                    productOption={productOption}
                                    onAddToCartClick={onAddToCartClick}
                                    onRemoveFromCartClick={onRemoveFromCartClick}/>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

ProductOptionList.PropTypes = {
    selectedProductOption: PropTypes.object.isRequired,
    productOptions: PropTypes.object.isRequired,
    productOptionsInCart: PropTypes.object,
    onAddToCartClick: PropTypes.func.isRequired,
    onRemoveFromCartClick: PropTypes.func.isRequired
}

export default ProductOptionList;