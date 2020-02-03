import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';
import Menu from 'grommet/components/Menu';

import './BrowseDepartmentNav.module.scss';
import BrowseDepartmentNavItem from './BrowseDepartmentNavItem';

class BrowseDepartmentNav extends Component {
    

    render () {
        const {
            categories,
            defaultSelectedNavIndex
        } = this.props;
        if (!categories) {
            return null;
        }
        return (
            <div className="ps-browse-department-nav">
                <div className="category-list">
                    <Accordion openMulti={true} active={[defaultSelectedNavIndex] || [0]}>
                    {
                        categories.map((category, index) => {
                            return (                                
                                <AccordionPanel heading={category.name} key={index}>
                                    <Menu responsive={false} primary={true} size="small">
                                    {
                                        category.subCategories.map((subcategory, index) => {
                                            return (
                                                <BrowseDepartmentNavItem subCategory={subcategory}
                                                    key={index}/>
                                            );
                                        })
                                    }
                                    </Menu>
                                </AccordionPanel>
                            );
                        })
                    }
                    </Accordion>
                </div>
            </div>
        );
    }
}

BrowseDepartmentNav.PropTypes = {
    defaultSelectedNavIndex: PropTypes.int,
    categories: PropTypes.object.isRequired
};

export default BrowseDepartmentNav;