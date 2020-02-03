import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import Breadcrumb from 'components/common/breadcrumb/Breadcrumb';

class ProductBreadCrumb extends Component {
    constructor (props) {
        this._getBreadcrmbs = this._getBreadcrmbs.bind(this);
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

    componentWillReceiveProps (nextProps) {
        this.breadcrumbs = this._getBreadcrmbs(this.props.selectedCategory, this.props.selectedSubCategory);
    }

    render () {
        retrun (
            <Breadcrumb items={this.breadcrumbs} basePath={basePath}/>
        );
    }
}