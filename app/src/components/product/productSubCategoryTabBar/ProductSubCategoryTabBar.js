import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
//import SwipeableTabs from 'react-swipeable-tabs';

import Box from 'grommet/components/Box';

/*style*/ import './ProductSubCategoryTabBar.module.scss';

class ProductSubCategoryTabBar extends Component {
    constructor () {
        super ();
    }
    render () {
        const {
            selectedSubCatIndex,
            subCategoryList,
            onTabClick
        } = this.props;
        return (
            <div className='ps-product-subcategory-tabbar'>
                {/* <SwipeableTabs
                    noFirstLeftPadding={true}
                    noLastRightPadding={false}
                    fitItems={false}
                    alignCenter={false}
                    borderWidthRatio={1}
                    activeItemIndex={selectedSubCatIndex}
                    onItemClick={onTabClick}
                    items={subCategoryList}
                    borderPosition="bottom"
                    borderThickness={3}
                    borderColor="#43B02A"
                    activeStyle={{
                        color: '#43B02A'
                    }}
                    itemStyle={{
                        padding: '8px',
                        lineHeight: '18px',
                        fontSize: '0.85rem'
                    }}
                /> */}
            </div>
        );
    }
}

ProductSubCategoryTabBar.PropTypes = {
    subCategoryList: PropTypes.object.isRequired,
    selectedSubCatIndex: PropTypes.number,
    onTabClick: PropTypes.func
}

export default ProductSubCategoryTabBar;