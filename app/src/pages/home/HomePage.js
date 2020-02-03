import React, { Component } from 'react';

/*style*/ import './HomePage.module.scss';

import Store from 'containers/store/Store'
import ProductsPopularSlider from 'containers/productsPopularSlider/ProductsPopularSlider';
/*import ProductsMaxDiscountSlider from 'containers/productsMaxDiscountSlider/ProductsMaxDiscountSlider';
import ProductsSeasonalSlider from 'containers/productsSeasonalSlider/ProductsSeasonalSlider';
import ProductsFeaturedSlider from 'containers/productsFeaturedSlider/ProductsFeaturedSlider';*/

class HomePage extends Component {
    render() {
        return (
                <div className='page-wrapper'>
                    <Store/>
					<div className="row">          
						<div className='columns small-12'>
							<ProductsPopularSlider title="Popular"/>
						</div>
					</div> 
                </div>
        );
    }
}

export default HomePage;