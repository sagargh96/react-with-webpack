import React, { Component } from 'react';

/*style*/ import './ProductsPage.module.scss';

import IsolatedScroll from 'components/common/isolatedScroll/IsolatedScroll';

import Products from 'containers/products/Products';
import BrowseDepartmentNavPanel from 'containers/browseDepartment/BrowseDepartmentNavPanel';
//import { Products } from 'containers';

class ProductsPage extends Component {
	render() {
		const props = this.props;
		const params = props.params;
		return (
			<div className="ps-products-page row page-wrapper">
				<div className="small-12 column no-padding">
					<div className="table-wrapper">
						<div className="table-row">
							<div className='left-panel show-for-large'>						
								<IsolatedScroll className='category-side-nav custom-scroll-bar'>
									<BrowseDepartmentNavPanel selectedCatName={params.categoryName} 
										selectedSubCatName={params.subCatName} />
								</IsolatedScroll>
							</div>
							<div className='right-panel'>
								<Products/>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ProductsPage;