import React, { Component } from 'react';
import PropTypes from 'prop-types';

/*style*/ import './ProductList.module.scss';
import ProductTile from 'components/product/productTile/ProductTile';

//import { ProductTile } from 'components/product';

class ProductList extends Component {
    constructor () {
        super ();
    }
    render () {
        const {
            basePath,
            products,
            cart,
            storeDetails,
            onAddToCartClick,
            onRemoveFromCartClick,
            onProductQtySelect            
        } = this.props;
        
        console.log('****productList');
        return (
            <div className='ps-product-list row no-margin'>
                {
                    products.map((product, index) => {
                        return (
                            <div className='product-list-item small-6 medium-4 large-3 columns' key={product.id}>
                                <ProductTile product={product} cart={cart} 
                                    storeDetails={storeDetails} basePath={basePath}
                                    onAddToCartClick={onAddToCartClick} 
                                    onRemoveFromCartClick={onRemoveFromCartClick}
                                    onQtySelect={onProductQtySelect}/>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

ProductList.PropTypes = {
    basePath: PropTypes.string,
    products: PropTypes.object,
    cart: PropTypes.object,
    storeDetails: PropTypes.object,
    onAddToCartClick: PropTypes.func,
    onRemoveFromCartClick: PropTypes.func,
    onProductQtySelect: PropTypes.func
}

export default ProductList;