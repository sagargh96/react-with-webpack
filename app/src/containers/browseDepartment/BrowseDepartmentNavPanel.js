import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BrowseDepartmentNavHeader from './BrowseDepartmentNavHeader';
import BrowseDepartmentNav from './BrowseDepartmentNav';
import { setSelectedCatAndSubCat, setSelectedCategoryIndex } from './BrowseDepartmentActions';

class BrowseDepartmentNavPanel extends Component {
    constructor (props) {
        super(props);
        this._getSelectedCategoryIndex = this._getSelectedCategoryIndex.bind(this);
    }

    _getSelectedCategoryIndex () {
        const categories = this.props.categories;
        if (!categories) {
            return;
        }    
        const selectedCatIndex = categories.findIndex((category) => (
            category.seoName === this.props.selectedCatName
        ));        
        return selectedCatIndex || 0;
    };

    componentWillReceiveProps (nextProps) {
        if (this.props.storeDetails !== nextProps.storeDetails) {            
            this.props.setSelectedCategoryIndex(this.props.selectedCatName, 
                this.props.selectedSubCatName);
        }
        if (this.props.selectedCatName !== nextProps.selectedCatName ||
            this.props.selectedSubCatName !== nextProps.selectedSubCatName) {                
            this.props.setSelectedCatAndSubCat(nextProps.selectedCatName, 
                nextProps.selectedSubCatName);
        }
    }
    render () {
        const {
            categories
        } = this.props;
        const selectedCatIndex = this._getSelectedCategoryIndex();
        return (
            <div className="ps-browse-department-nav-panel">
                <BrowseDepartmentNavHeader/>
                <BrowseDepartmentNav defaultSelectedNavIndex={selectedCatIndex} categories={categories}/>
            </div>
        );
    }
}

BrowseDepartmentNavPanel.PropTypes = {
    setSelectedCatAndSubCat: PropTypes.func.isRequired,
    setSelectedCategoryIndex: PropTypes.func.isRequired
};
const mapStateToProps = (state) => ({
    storeDetails: state.data.store.storeDetails,    
    categories: state.data.store.categories
});
const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators ({
        setSelectedCatAndSubCat: setSelectedCatAndSubCat,
        setSelectedCategoryIndex: setSelectedCategoryIndex
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(BrowseDepartmentNavPanel);