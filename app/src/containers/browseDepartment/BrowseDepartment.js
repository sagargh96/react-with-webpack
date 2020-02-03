import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { bindActionCreators } from 'redux';

import Button from 'grommet/components/Button';
import MenuIcon from 'grommet/components/icons/base/Menu';
import Box from 'grommet/components/Box';

/*style*/ import './BrowseDepartment.module.scss';
import BrowseDepartmentNavHeader from './BrowseDepartmentNavHeader';
import BrowseDepartmentNav from './BrowseDepartmentNav';
import Modal from 'components/common/modal/Modal';
import { openDepartmentModal, 
        closeDepartmentModal } from './BrowseDepartmentActions';

class BrowseDepartment extends Component {
    constructor () {
        super();
    }

    /*<Button icon={<MenuIcon />}
        className="ps-button hover-effect"
        label="Departments"
        onClick={onBrowseDepartmentClick}
        plain={true} size='small' fill={false}/> */
    render () {
        const {
            selectedCatIndex,
            categories,
            showModal,
            onBrowseDepartmentClick,
            onCloseClick
        } = this.props;
        return (
            <Box className="ps-browse-department">
                    <Modal
                        isOpen={showModal}
                        align='left'
                        closer
                        isInvert
                        contentLabel='Modal'
                        shouldCloseOnOverlayClick={true}
                        className="ps-browse-department-modal custom-scroll-bar"
                        overlayClassName='modal-overlay'
                        title='Departments'
                        onCloseClick={onCloseClick}>
                            <div className='departments-modal-content'>
                                <BrowseDepartmentNavHeader/>
                                <BrowseDepartmentNav 
                                    categories={categories}
                                    defaultSelectedNavIndex={this.props.selectedCatIndex}
                                    />
                            </div>
                    </Modal>
            </Box>
        )
    }
}

const mapStateToProps = (state) => ({
    selectedCatIndex: state.ui.browseDepartment.selectedCatIndex,
    showModal: state.ui.browseDepartment.showModal,    
    categories: state.data.store.categories
});

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators ({
        onBrowseDepartmentClick: openDepartmentModal,
        onCloseClick: closeDepartmentModal
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(BrowseDepartment);