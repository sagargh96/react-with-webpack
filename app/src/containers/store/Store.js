import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/*style*/ import './Store.module.scss';
import StoreBanner from 'components/store/storeBanner/StoreBanner';
import ProductCategoryList from 'components/product/productCategoryList/ProductCategoryList';
import Loader from 'components/common/loader/Loader';

/*import { StoreBanner, StoreDetails } from 'components/store';
import { ProductCategoryList, ProductCarousel } from 'components/product';*/

import { addItemToCart, removeItemFromCart } from '../cart/CartActions';
import { updateProductSelectedQty } from '../products/ProductsActions';
import { config } from "utils/Config";

class Store extends Component {
    constructor () {
        super();
    }
    render () {
        const {
            store,
        } = this.props;
        return (
            <div className='store-widget'>
                {
                    (store.status === 'IN_PROGRESS') ?
                        <div className='loader-wrapper'>
                            <Loader style='inverted' size='normal'/>
                        </div>
                    :(
                        <div>
						<div className='row expanded'>  
                            <div className='columns small-12 no-padding'>
                                <div className='store-header v-normal-bottom'>
                                    <StoreBanner bannerList={store.banners}/>
                                </div>
                            </div>
						</div>
						<div className='row'>               
                            <div className='columns small-12'>         
                                <h3 className="bold">Departments</h3>
                                <ProductCategoryList categoryList={store.categories} basePath={config.basePath}/>
                            </div>
						</div>
                        </div>)
                }
            </div>
        )
    }
}

Store.PropTypes = {
    cart: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
    products: PropTypes.object.isRequired,
    onAddToCartClick: PropTypes.func,
    onRemoveFromCartClick: PropTypes.func,
    onProductQtySelect: PropTypes.func
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators ({
        onAddToCartClick: addItemToCart,
        onRemoveFromCartClick: removeItemFromCart,
        onProductQtySelect: updateProductSelectedQty
    }, dispatch)
});

const mapStateToProps = (state) => ({
    store: state.data.store,
    cart: state.data.cart,
    products: state.ui.products.products
});

export default connect(mapStateToProps, mapDispatchToProps)(Store);