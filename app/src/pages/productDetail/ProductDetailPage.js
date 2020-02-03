import React, { Component } from 'react';

/*style*/ import './ProductDetailPage.module.scss';

import ProductDetail from 'containers/productDetail/ProductDetail';
//import {ProductDetail} from 'containers';

class ProductDetailPage extends Component {
	render() {
		const props = this.props;
		const params = props.params;
		return (
			<div className="row page-wrapper">
				<div className="small-12 column no-padding">
					<ProductDetail selectedCatName={params.categoryName} selectedSubCatName={params.subCatName}/>
				</div>
			</div>
		);
	}
}

export default ProductDetailPage;