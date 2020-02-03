import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';

import Anchor from 'grommet/components/Anchor';

class BrowseDepartmentNavItem extends Component {
    render () {
        const {
            subCategory,
            link,
            isSelected
        } = this.props;        
        const activeNav = classnames({
            'active': isSelected
        });
        return (
            <Anchor className='nav-item' path={subCategory.link} className={activeNav}>
                {subCategory.name}
            </Anchor>
        );
    }
}

BrowseDepartmentNavItem.PropTypes = {
    subCategory: PropTypes.object.isRequired,
    isSelected: PropTypes.bool
};

const mapStateToProps = (state, {subCategory}) => ({
    isSelected: state.ui.browseDepartment.selectedSubCategory &&
        state.ui.browseDepartment.selectedSubCategory.seoName === subCategory.seoName
});

export default connect(mapStateToProps)(BrowseDepartmentNavItem);