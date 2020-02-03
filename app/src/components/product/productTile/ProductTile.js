import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LinesEllipsis from 'react-lines-ellipsis';

import Box from 'grommet/components/Box';
import Tile from 'grommet/components/Tile';

/*style*/ import './ProductTile.module.scss';
import ImageLazyLoader from 'components/common/imageLazyLoader/ImageLazyLoader';
import CartItemAddRemoveBtn from 'components/cart/cartItemAddRemoveBtn/CartItemAddRemoveBtn';
import ProductOptionSelector from 'components/product/productOptionSelector/ProductOptionSelector';
import prodImg from 'images/prod_img_3.jpg';

/*import { ImageLazyLoader } from 'components/common';
import { CartItemAddRemoveBtn} from 'components/cart';*/

class ProductTile extends Component {
    constructor (props) {
        super (props);
        this._onAddToCartClick = this._onAddToCartClick.bind(this);
        this._onRemoveFromCartClick = this._onRemoveFromCartClick.bind(this);
        this._getDefaultSelectedProductOption = this._getDefaultSelectedProductOption.bind(this);
    }

    _onAddToCartClick (selectedProductOption) {
        this.props.onAddToCartClick(this.props.product, selectedProductOption);
    }

    _onRemoveFromCartClick (selectedProductOption) {
        this.props.onRemoveFromCartClick(this.props.product, selectedProductOption);
    }

    _getDefaultSelectedProductOption (product, selectedProductOption, productOptionsInCart) {
        let _selectedProductOption = {};
        if (selectedProductOption) {
            _selectedProductOption = {
                ...selectedProductOption
            }
        } else if (productOptionsInCart && Object.keys(productOptionsInCart).length > 0) {
            const productOptionIds = Object.keys(productOptionsInCart);
            _selectedProductOption = {
                ...productOptionsInCart[productOptionIds[0]],
                //...productOptionsInCart[productOptionIds[0]].productOptionStoreList[0]
            }
        } else {
            _selectedProductOption = {
                ...product.productOptions[0],
                ...product.productOptions[0].productOptionStoreList[0]
            }
        }
        return _selectedProductOption;
    }

    render () {
        console.log('****productTile');
        const {
            product,
            link,
            selectedProductOption,
            productOptionsInCart,
            productOptionModalIsOpen,
            onProductOptionModalOpen,
            onProductOptionModalClose
        } = this.props;
        const _selectedProductOption = this._getDefaultSelectedProductOption(product, 
                selectedProductOption, productOptionsInCart);
        return (
            <Tile className='ps-product-tile small-6 medium-4 large-3 columns' 
            responsive={false} pad="small"
                align="stretch" size="small">
                <Box className='product-img'>                
                    <ImageLazyLoader src={prodImg} 
                        preLoader='{()=><Spinning/>}'>
                        <span className='secondary-text'>{product.name} image</span>
                    </ImageLazyLoader>
                </Box>
                <Box className='product-name primary-text' title={product.name}>
                    <LinesEllipsis maxLine='2' text={product.name}/>
                </Box>
                <Box className="tile-footer">                
                    <div className='product-price v-small-bottom v-xsmall-top'>
                        {
                            _selectedProductOption.oldPrice < _selectedProductOption.price ?                                         
                            (<span className='product-old-price'>₹{_selectedProductOption.oldPrice}</span>):
                            null
                        }
                        <span>
                            <span className='product-new-price primary-text'>₹{_selectedProductOption.price}</span>
                        </span>
                        <span className='product-qty'>
                                <ProductOptionSelector 
                                    product={product}
                                    selectedProductOption={_selectedProductOption}
                                    productOptionsInCart={productOptionsInCart}
                                    onProductOptionModalOpen={onProductOptionModalOpen}
                                    onProductOptionModalClose={onProductOptionModalClose}
                                    productOptionModalIsOpen={productOptionModalIsOpen}
                                    productDetailLink={link}
                                    onAddToCartClick={this._onAddToCartClick}
                                    onRemoveFromCartClick={this._onRemoveFromCartClick}/>
                        </span>
                    </div>
                    <div className='product-add-cart v-xsmall-top'>
                        <CartItemAddRemoveBtn 
                            itemCount={_selectedProductOption.count || 0}
                            itemCountText="in cart"
                            itemInventory={_selectedProductOption.stockQty}
                            onIncCartItemCountClick={() => {
                                this._onAddToCartClick(_selectedProductOption);
                            }}
                            onDecCartItemCountClick={() => {
                                this._onRemoveFromCartClick(_selectedProductOption);
                            }}
                        />
                    </div>
                </Box>
            </Tile>
        );
    }
}

ProductTile.PropTypes = {
    product: PropTypes.object.isRequired,
    link: PropTypes.string.isRequired,
    selectedProductOption: PropTypes.object,
    productOptionModalIsOpen: PropTypes.bool,
    productOptionsInCart: PropTypes.object,

    onAddToCartClick: PropTypes.func,
    onRemoveFromCartClick: PropTypes.func,
    onProductOptionModalClose: PropTypes.func,
    onProductOptionModalOpen: PropTypes.func
}

export default ProductTile;