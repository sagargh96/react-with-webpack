import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ProductTile from 'components/product/productTile/ProductTile';

import { addItemToCart, removeItemFromCart } from 'containers/cart/CartActions';
import { productOptionModalOpen, productOptionModalClose, 
         selectDefaultProductOption } from './ProductsActions';

class ProductListItem extends Component {
    constructor () {
        super ();
        this.getProductOptionInCart = this.getProductOptionInCart.bind(this);
        this.getProductOptionsInCartByProductId = this.getProductOptionsInCartByProductId.bind(this);
    }
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
            selectedProductOption,
            productOptionsInCart,
            productOptionModalIsOpen,
            productOptionModalClose,
            productOptionModalOpen,
            onAddToCartClick,
            onRemoveFromCartClick
        } = this.props;
        
        console.log('****productListItem: ' + product.id);
        return (
            <ProductTile 
                product={product}
                link={link}
                selectedProductOption={selectedProductOption}
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
    selectedProductOption: PropTypes.object,
    productOptionModalIsOpen: PropTypes.bool,
    onAddToCartClick: PropTypes.func.isRequired,
    onRemoveFromCartClick: PropTypes.func.isRequired,
    productOptionModalClose: PropTypes.func,
    productOptionModalOpen: PropTypes.func,
    selectDefaultProductOption: PropTypes.func.isRequired
}

const makeMapStateToProps = (state, { product }) => ({
        productOptionModalIsOpen: state.ui.products.selectedProductId === product.id,
        selectedProductOption: getProductOptionInCart(state.data.cart, 
            state.data.store.storeDetails, product.id, product.selectedProductOptionId),
        productOptionsInCart: getProductOptionsInCartByProductId(state.data.cart, 
            state.data.store.storeDetails, product.id)
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

const getProductOptionInCart = (cart, storeDetails, productId, productOptionId) => {
    if (!(productOptionId && storeDetails && storeDetails.id && cart.items[storeDetails.id] &&
        cart.items[storeDetails.id].products[productId])) {
        return null;
    }
    return cart.items[storeDetails.id].products[productId].productOptions[productOptionId];
};

const getProductOptionsInCartByProductId = (cart, storeDetails, productId) => {
    if (!(productId && storeDetails && cart && cart.items[storeDetails.id] &&
        cart.items[storeDetails.id].products && cart.items[storeDetails.id].products[productId])) {
        return null;
    }
    return cart.items[storeDetails.id].products[productId].productOptions;
};

export default connect(makeMapStateToProps, mapDispatchToProps)(ProductListItem);