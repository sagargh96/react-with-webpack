import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/*style*/ import './Products.module.scss';

import ProductList from './ProductList';

/* import { ProductList, ProductSubCategoryTabBar, 
         ProductSubCategorySideNav } from 'components/product'; */
import { Breadcrumb } from 'components/common';

import { fetchProducts } from './ProductsActions';
import { config } from "utils/Config";

class Products extends Component {
    constructor (props) {
        super (props);        
        this.props.fetchProducts(props.selectedCategory, props.selectedSubCategory);
        this._getBreadcrumbItems = this._getBreadcrumbItems.bind(this);
    }

    _getBreadcrumbItems () {
        const selectedCategory = this.props.selectedCategory;
        const selectedSubCategory = this.props.selectedSubCategory;
        let items = [];
        if (selectedCategory) {
            items.push({
                link: selectedCategory.seoName,
                name: selectedCategory.name
            });
        }
        if (selectedSubCategory) {
            items.push({
                link: selectedCategory.seoName + '/' + selectedSubCategory.seoName,
                name: selectedSubCategory.name
            });
        }
        return items;
    }

    componentWillReceiveProps (nextProps) {
        if (this.props.selectedSubCategory !== nextProps.selectedCategory &&
            this.props.selectedSubCategory !== nextProps.selectedSubCategory) {
                this.props.fetchProducts(nextProps.selectedCategory, nextProps.selectedSubCategory);
        }
    }

    render () {
        const {
            selectedCategory,
            selectedSubCategory
        } = this.props;
       
        if (!selectedCategory || !selectedSubCategory) {
            return null;
        }
        const breadcrumbItems = this._getBreadcrumbItems();
        console.log('****products');
        return (
            <div className='products'>               
                    <div className="row expanded no-margin">
                        <div className="column v-small no-padding">
                            <Breadcrumb items={breadcrumbItems} basePath={config.basePath}/>
                            <div className='header'>
                                <h3 className="bold">{selectedSubCategory.name}</h3>
                            </div>
                            <ProductList category={selectedCategory} subCategory={selectedSubCategory}/>
                        </div>
                    </div>
            </div>
        );
    }
}

Products.PropTypes = {
    selectedCategory: PropTypes.object.isRequired,
    selectedSubCategory: PropTypes.object.isRequired,
    fetchProducts: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators ({
        fetchProducts: fetchProducts
    }, dispatch)
});

const mapStateToProps = (state) => ({
    selectedCategory: state.ui.browseDepartment && state.ui.browseDepartment.selectedCategory,
    selectedSubCategory: state.ui.browseDepartment && state.ui.browseDepartment.selectedSubCategory
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);