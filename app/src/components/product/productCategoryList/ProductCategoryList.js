import React, { Component } from 'react';
import PropTypes from 'prop-types';

/*style*/ import './ProductCategoryList.module.scss';
import ProductCategory from 'components/product/productCategory/ProductCategory';

//import {ProductCategory} from 'components/product';

class ProductCategoryList extends Component {
    constructor () {
        super ();
    }
    render () {
        const {
            categoryList,
            basePath
        } = this.props;
        return (
            <ul className='ps-product-category-list row'>
                {
                    categoryList ?
                    categoryList.map((category, index) => {
                        return (
                            <li className='grommetux- product-category-item small-12 medium-6 large-6 columns' key={index}>
                                <ProductCategory category={category} basePath={basePath}/>
                            </li>
                        );
                    })
                    :<li>There are no categories available</li>
                }
            </ul>
        );
    }
}

ProductCategoryList.PropTypes = {
    categoryList: PropTypes.object.isRequired,
    basePath: PropTypes.string
}

export default ProductCategoryList;