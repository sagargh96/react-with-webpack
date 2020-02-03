import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Tabs from 'grommet/components/Tabs';
import Tab from 'grommet/components/Tab';
import Paragraph from 'grommet/components/Paragraph';

/*style*/ import './ProductDetail.module.scss';

import ProdDetail from 'components/product/prodDetail/ProdDetail';
import ProductFeatures from 'components/product/productFeatures/ProductFeatures';
import ProductSubCategoryTabBar from 'components/product/productSubCategoryTabBar/ProductSubCategoryTabBar';
import ProductSubCategorySideNav from 'components/product/productSubCategorySideNav/ProductSubCategorySideNav';
import IsolatedScroll from 'components/common/isolatedScroll/IsolatedScroll';
import Breadcrumb from 'components/common/breadcrumb/Breadcrumb';

/* import { ProdDetail, ProductFeatures, ProductSubCategoryTabBar,
         ProductSubCategorySideNav } from 'components/product';
import {  IsolatedScroll, Breadcrumb } from 'components/common'; */

import { updateProductSelectedQty, selectProductSubCategory } from './ProductDetailActions';
import { addItemToCart, removeItemFromCart } from '../cart/CartActions';
import { config } from 'utils/Config';

class ProductDetail extends Component {
    constructor (props) {
        super (props);
        this._getBreadcrmbs = this._getBreadcrmbs.bind(this);
        this._setSelectedCatAndSubCat = this._setSelectedCatAndSubCat.bind(this);
        this.breadcrumbs = [];
        this.selectedCategory = null;
        this.selectedSubCategory = null;
    }
    _getBreadcrmbs(selectedCategory, selectedSubCat) {
        let breadcrumbs = [];
        if (selectedCategory) {
            breadcrumbs.push({
                name: selectedCategory.name,
                link: selectedCategory.seoName
            });
            
            if (selectedSubCat) {
                breadcrumbs.push({
                    name: selectedSubCat.title,
                    link: selectedCategory.seoName + '/' + selectedSubCat.seoName
                });
            }
        }
        return breadcrumbs;
    }

    _setSelectedCatAndSubCat (store, selectedCatName, selectedSubCatName) {
        const selectedCat = store.categories.find((category) => (
            category.seoName === selectedCatName
        ));
        this.selectedCategory = selectedCat || store.categories[0];
        const selectedSubCat = 
            this.selectedCategory.subCategories.find((subCategory)=>(
                subCategory.seoName === selectedSubCatName
            ));
        this.selectedSubCategory = selectedSubCat || this.selectedCategory.subCategories[0];
        this.breadcrumbs = this._getBreadcrmbs(this.selectedCategory, this.selectedSubCategory);
        this.props.onProductSubCategorySelected(this.selectedCategory, this.selectedSubCategory);
    }

    componentWillMount () {
        this._setSelectedCatAndSubCat(this.props.store, this.props.selectedCatName, 
            this.props.selectedSubCatName);
    }
    
    componentWillReceiveProps (nextProps) {
        if (this.props.selectedCatName !== nextProps.selectedCatName ||
            this.props.selectedSubCatName !== nextProps.selectedSubCatName) {
            this._setSelectedCatAndSubCat(nextProps.store, nextProps.selectedCatName, 
                nextProps.selectedSubCatName);
        }
    }

    render () {
        const {
            cart,
            store,
            selectedCatName,
            selectedSubCatName,
            productDetail,
            onAddToCartClick,
            onRemoveFromCartClick,
            onProductQtySelect
        } = this.props;

        return (
            <div className='ps-product-detail-container'>
                <div className='left-panel show-for-large'>
                    <IsolatedScroll className='category-side-nav custom-scroll-bar'>
                        <ProductSubCategorySideNav 
                            selectedCat={this.selectedCategory}
                            selectedSubCat={this.selectedSubCategory}
                            store={store}/>
                    </IsolatedScroll>
                </div>
                <div className='right-panel'>                
                    <div className="row expanded product-detail h-no-margin">
                        <div className="column v-small-top">
                            <div className='header'>
                                <Breadcrumb items={this.breadcrumbs} basePath={config.basePath}/>
                            </div>
                            <ProdDetail productDetail={productDetail} 
                            cart={cart} store={store.storeDetails} 
                            onAddToCartClick={onAddToCartClick} 
                            onRemoveFromCartClick={onRemoveFromCartClick}
                            onQtySelect={onProductQtySelect}
                            />
                        </div>
                    </div>
                    <div className="row expanded product-about h-no-margin v-large-top">
                        <div className="column">
                            <Tabs justify='start'>
                                <Tab title='About'>
                                    <Paragraph>{productDetail.description}</Paragraph>
                                </Tab>
                                <Tab title='Features'>
                                    <ProductFeatures productFeatures={productDetail.features}/>
                                </Tab>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ProductDetail.PropTypes = {
    cart: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
    selectedCatName: PropTypes.string,
    selectedSubCatName: PropTypes.string,
    productDetail: PropTypes.object.isRequired,
    onProductSubCategorySelected: PropTypes.func,
    onAddToCartClick: PropTypes.func,
    onRemoveFromCartClick: PropTypes.func,
    onProductQtySelect: PropTypes.func
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators ({
        onProductSubCategorySelected: selectProductSubCategory,
        onAddToCartClick: addItemToCart,
        onRemoveFromCartClick: removeItemFromCart,
        onProductQtySelect: updateProductSelectedQty
    }, dispatch)
});

const mapStateToProps = (state) => ({
    cart: state.data.cart,
    store: state.data.store,
    productDetail: state.pages.productDetail
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);