import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ProductTile from 'components/product/productTile/ProductTile';

import { addItemToCart, removeItemFromCart } from 'containers/cart/CartActions';
import { productOptionModalOpen, productOptionModalClose, 
         selectDefaultProductOption } from './ProductsActions';
import { makeGetProductOptionModalIsOpen } from './Selectors';
import { makeGetProductOptionInCart, makeGetProductOptionsInCartByProductId } from 'containers/cart/Selectors';
//import { ProductTile } from 'components/product';

class ProductListItem extends Component {
    constructor () {
        super ();
        this.getProductOptionInCart = this.getProductOptionInCart.bind(this);
        this.getProductOptionsInCartByProductId = this.getProductOptionsInCartByProductId.bind(this);
    }
    // shouldComponentUpdate(nextProps) {
    //     const prevProps = this.props;
    //     let shouldUpdate = false;

    //     Object.keys(nextProps).forEach(propName => {
    //         if (typeof nextProps[propName] !== 'function') {
    //             if (nextProps[propName] !== prevProps[propName]) {
    //                 shouldUpdate = true;
    //             }
    //         }
    //     });

    //     return shouldUpdate;
    // }
    getProductOptionInCart(cart, storeDetails, productOptionId) {
        if (!(productOptionId && storeDetails && storeDetails.id && cart.items[storeDetails.id])) {
            return null;
        }
        return cart.items[storeDetails.id].products[productOptionId];
    }
    getProductOptionsInCartByProductId(cart, storeDetails, productId) {
        if ((!storeDetails && !storeDetails.id) || (!cart.items || cart.items.length <= 0)) {
            return null;
        }

        const cartItems = Object.values(cart.items[storeDetails.id].products).filter((item) => {
            return item.details.id === productId;
        });
        return cartItems;
    }
    componentDidMount () {
        if (!this.props.product.selectedProductOptionId && this.props.productOptionsInCart
            && this.props.productOptionsInCart.length > 0) {
            this.props.selectDefaultProductOption(this.props.product, 
                this.props.productOptionsInCart[0]);
        }
    }
    render () {
        const {
            product,
            link,
            //productOptionInCart,
            //productOptionsInCart,
            productOptionModalIsOpen,
            productOptionModalClose,
            productOptionModalOpen,
            onAddToCartClick,
            onRemoveFromCartClick,
            cart,
            storeDetails
        } = this.props;
        
        console.log('****productListItem: ' + product.id);
        const productOptionInCart = this.getProductOptionInCart(cart, storeDetails, product.selectedProductOptionId);
        const productOptionsInCart = this.getProductOptionsInCartByProductId(cart, storeDetails, product.id);
        return (
            <ProductTile 
                product={product}
                link={link}
                selectedProductOption={productOptionInCart}
                productOptionsInCart={productOptionsInCart}
                productOptionModalIsOpen={productOptionModalIsOpen}
                onProductOptionModalClose={productOptionModalClose}
                onProductOptionModalOpen={productOptionModalOpen}
                onAddToCartClick={onAddToCartClick} 
                onRemoveFromCartClick={onRemoveFromCartClick}/>
        );
    }
}

ProductListItem.PropTypes = {
    product: PropTypes.object.isRequired,    
    productOptionInCart: PropTypes.object,
    productOptionModalIsOpen: PropTypes.bool,
    onAddToCartClick: PropTypes.func.isRequired,
    onRemoveFromCartClick: PropTypes.func.isRequired,
    productOptionModalClose: PropTypes.func,
    productOptionModalOpen: PropTypes.func,
    selectDefaultProductOption: PropTypes.func.isRequired
}

const makeMapStateToProps = (state, { product }) => ({
        cart: state.data.cart,
        storeDetails: state.data.store.storeDetails,
        productOptionModalIsOpen: state.ui.products.selectedProductId === product.id
    });

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators ({
        onAddToCartClick: addItemToCart,
        onRemoveFromCartClick: removeItemFromCart,
        productOptionModalClose: productOptionModalClose,
        productOptionModalOpen: productOptionModalOpen,
        selectDefaultProductOption: selectDefaultProductOption
    }, dispatch)
});

export default connect(makeMapStateToProps, mapDispatchToProps)(ProductListItem);