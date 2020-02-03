import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { config } from 'utils/Config';
import ProductCarousel from 'components/product/productCarousel/ProductCarousel';
import ProductListItem from 'containers/products/ProductListItem';

class ProductsPopularSlider extends Component {
    constructor (props) {
        super (props);
    }

    componentDidMount () {
    }

    render () {
		const {
			title,
			products,
			isMobile,
			isTablet
        } = this.props;
        return (			
			products && products.length > 0 ?
            <div className='ps-products-popular-slider'>
				<h3 className="bold">{title}</h3>
				<ProductCarousel isPlainSlider={isMobile || isTablet}>
					{
						products.map((product, index) => {
							return (
								<div key={product.id}>
								<ProductListItem
									product={product}
									key={index}
                            		link={`${config.basePath}`}/>
								</div>
							);
						})
					}
				</ProductCarousel>
            </div>
			:
			null
        );
    }
}

ProductsPopularSlider.PropTypes = {
    products: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
	products: state.ui.productsPoupularSlider.popularProducts,	
    isMobile: state.browser.is.small,
    isTablet: state.browser.is.medium,
});

export default connect(mapStateToProps)(ProductsPopularSlider);