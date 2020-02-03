import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import LinesEllipsis from 'react-lines-ellipsis';

import Select from 'grommet/components/Select';
import Label from 'grommet/components/Label';

/*style*/ import './ProdDetail.module.scss';
import ImageLazyLoader from 'components/common/imageLazyLoader/ImageLazyLoader';
import CartItemAddRemoveBtn from 'components/cart/cartItemAddRemoveBtn/CartItemAddRemoveBtn';
import prodImg from 'images/prod_img_3.jpg';

/*import { ImageLazyLoader } from 'components/common';
import { CartItemAddRemoveBtn } from 'components/cart';*/

class ProdDetail extends Component {
    constructor (props) {
        super (props);
        this._onQtySelect = this._onQtySelect.bind(this);
        this.selectedQty = null;
    }

    _onQtySelect (obj) {
        this.props.onQtySelect(this.props.productDetail.id, obj.option);
    }

    render () {
        const {
            productDetail,
            cart,
            store,
            onAddToCartClick,
            onRemoveFromCartClick,
            onQtySelect
        } = this.props;

        const cartQuantityList = cart.items[store.id] && cart.items[store.id].products &&
                          cart.items[store.id].products[productDetail.id] &&
                          cart.items[store.id].products[productDetail.id].qtyPurchased;
        const cartStoreSumary = cart.items[store.id].storeDetails || store;
        let cartQuantity = (cartQuantityList && cartQuantityList[Object.keys(cartQuantityList)[0]]);
        if (!productDetail.selectedQty) {
            if (cartQuantity) {
                this.selectedQty = productDetail.qtyList.find(qty => qty.id === cartQuantity.id);
            } else {
                this.selectedQty = productDetail.qtyList[0];
            }
        } else {
            cartQuantity = (cartQuantityList && cartQuantityList[productDetail.selectedQty.id]);
            this.selectedQty = productDetail.selectedQty;
        }         
        return (
            <div className='ps-product-detail row'>
                <div className='column large-5 medium-6 small-12'>                
                    <div className='productDetail-img'>                
                        <ImageLazyLoader src={prodImg} 
                            preLoader='{()=><Spinning/>}'>
                            <span className='secondary-text'>{productDetail.name} image</span>
                        </ImageLazyLoader>
                    </div>
                </div>
                <div className='column large-7 medium-6 small-12'>
                    <div className='productDetail-name primary-text'>
                        <h3 className="bold v-normal-top">{productDetail.name}</h3>
                    </div>                
                    <div className='productDetail-price'>
                        <span className='productDetail-old-price'>₹{productDetail.oldPricePerUnit}</span>
                        <span>
                            <span className='productDetail-new-price bold'>₹{productDetail.pricePerUnit}</span>
                            <span>per {productDetail.unitQty.value} </span>
                        </span>
                    </div>
                    <div className='productDetail-qty v-normal-top'>
                        {
                            (productDetail.qtyList && productDetail.qtyList.length > 0) ?
                                <Select className="product-qty-select v-xsmall-top" options={productDetail.qtyList} value={this.selectedQty.value}
                                    onChange={this._onQtySelect}></Select>
                            : null
                        }
                    </div>
                    <div className='productDetail-add-cart v-normal-top'>
                        <CartItemAddRemoveBtn itemCount={cartQuantity && cartQuantity.count || 0}
                            itemQty={this.selectedQty.value}
                            itemInventory={productDetail.inventory}
                            onIncCartItemCountClick={() => {
                                onAddToCartClick(cartStoreSumary, productDetail, this.selectedQty);
                            }}
                            onDecCartItemCountClick={() => {
                                onRemoveFromCartClick(cartStoreSumary, productDetail, this.selectedQty);
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

ProdDetail.PropTypes = {
    productDetail: PropTypes.object,
    cart: PropTypes.object,
    onAddToCartClick: PropTypes.func,
    onRemoveFromCartClick: PropTypes.func,
    onQtySelect: PropTypes.func
}

export default ProdDetail;