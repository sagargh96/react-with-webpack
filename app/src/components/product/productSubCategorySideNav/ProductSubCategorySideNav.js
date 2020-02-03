import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import classnames from 'classnames';

import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';
import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';
import DeliveryIcon from 'grommet/components/icons/base/Deliver';
import ClockIcon from 'grommet/components/icons/base/Clock';

/*style*/ import './productSubCategorySideNav.module.scss';
import Avatar from 'components/common/avatar/Avatar';

//import { Avatar } from 'components/common';

class ProductSubCategorySideNav extends Component {
    constructor () {
        super ();
    }
    render () {
        const {
            selectedCat,
            selectedSubCat,
            store
        } = this.props;
        const {
            storeDetails,
            categories
        } = store;
        const basePath = this.props.basePath || '';
        let selectedCatIndex = -1;
        let selectedSubCatIndex = -1;
        if (selectedCat) { 
            selectedCatIndex = store.categories.findIndex((category) => (
                category.id === selectedCat.id
            ));
            const selectedCategory = store.categories[selectedCatIndex];
            if (selectedCategory) {
                selectedSubCatIndex = selectedCategory.subCategories.findIndex((subCategory) => (
                    subCategory.id === selectedSubCat.id
                ));
            }
        }
        return (
            <div className='ps-product-subcategory-sidenav'>
                <div className='row v-small-top sidenav-header'>
                    <div className='column large-3 small-2 store-avatar'>
                        <Avatar link={basePath} text='V1'/>
                    </div>
                    <div className='column large-9 store-details'>
                        <h4>{storeDetails.name}</h4>
                        <div className='secondary-text small v-xsmall-top'>
                            <div><DeliveryIcon className='small'/> {storeDetails.deliveryCharges.freeDeliveryText} {storeDetails.deliveryCharges.freeDeliveryAmount}</div>
                            <div><ClockIcon className='small'/> Next day delivery</div>
                        </div>
                    </div>
                </div>
                <div className="category-list">
                <Accordion openMulti={true} active={[selectedCatIndex] || [0]}>
                    {
                    categories.map((category, index) => {
                        const selectedCatFound = index === selectedCatIndex;
                        return (
                            <AccordionPanel heading={category.name}
                                key={index}>
                                <Menu responsive={false}
                                        primary={true}
                                        size="small">
                                        {
                                            category.subCategories.map((subcategory, index) => {
                                                const activeNav = classnames({
                                                    'active': selectedCatFound && index === selectedSubCatIndex,
                                                    'nav-item': true
                                                });
                                                return (<Anchor path={`${basePath}/${category.seoName}/${subcategory.seoName}`}
                                                    className={activeNav} key={index}>
                                                    {subcategory.name}
                                                </Anchor>)
                                            })
                                        }
                                </Menu>
                            </AccordionPanel>)
                    })
                }
                </Accordion>
                </div>
            </div>
        );
    }
}

ProductSubCategorySideNav.PropTypes = {
    selectedCat: PropTypes.object.isRequired,
    selectedSubCat: PropTypes.object,
    store: PropTypes.object.isRequired,
    basePath: PropTypes.string
}

export default ProductSubCategorySideNav;