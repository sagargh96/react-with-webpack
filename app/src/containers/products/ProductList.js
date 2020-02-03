import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Tiles from 'grommet/components/Tiles';
import { config } from 'utils/Config';

import ProductListItem from './ProductListItem';

class ProductList extends Component {
    constructor () {
        super ();
    }
    render () {
        const {
            products,
            category,
            subCategory          
        } = this.props;
        
        return (
            <Tiles className='ps-product-list row no-margin' fill={false} pad="none" responsive={false}>            
                {
                    products.map((product, index) => {
                        return (
							<ProductListItem
								product={product}
								key={index}
                            	link={`${config.basePath}/${category.seoName}/${subCategory.seoName}/${product.seoName}`}/>
                        );
                    })
                }
            </Tiles>
        );
    }
}

ProductList.PropTypes = {
    products: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    products: state.ui.products.products
});

export default connect(mapStateToProps)(ProductList);