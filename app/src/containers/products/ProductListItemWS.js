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
    }
    shouldComponentUpdate(nextProps) {
        const prevProps = this.props;
        let shouldUpdate = false;

        Object.keys(nextProps).forEach(propName => {
            if (typeof nextProps[propName] !== 'function') {
                if (nextProps[propName] !== prevProps[propName]) {
                    shouldUpdate = true;
                }
            }
        });

        return shouldUpdate;
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
            productOptionInCart,
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

const makeMapStateToProps = () => {
    const getProductOptionInCart = makeGetProductOptionInCart();
    const getProductOptionModalIsOpen = makeGetProductOptionModalIsOpen();
    const getProductOptionsInCartByProductId = makeGetProductOptionsInCartByProductId();
    return (state, { product }) => ({
        
        // productOptionsInCart: getProductOptionsInCartByProductId(state, {
        //     productId: product.id
        // }),
        productOptionInCart: getProductOptionInCart(state, {
            productOptionId: product.selectedProductOptionId
        }),
        productOptionModalIsOpen: getProductOptionModalIsOpen(state, {
            productId: product.id
        })
    });
};

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