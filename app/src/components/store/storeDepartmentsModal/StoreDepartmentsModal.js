import React, { Component } from 'react';
import PropTypes from 'prop-types';

/*style*/ import './StoreDepartmentsModal.module.scss';
import Modal from 'components/common/modal/Modal';
import ProductSubCategorySideNav from 'components/product/productSubCategorySideNav/ProductSubCategorySideNav';

/*import { Modal } from 'components/common';
import { ProductSubCategorySideNav } from 'components/product';*/

class StoreDepartmentsModal extends Component {
    constructor () {
        super ();
    }
    render () {
        const {
            browseDepartment,
            store,
            onCloseClick
        } = this.props;
        return (
            <Modal
                isOpen={browseDepartment.showModal}
                align='left'
                closer
                contentLabel='Modal'
                shouldCloseOnOverlayClick={true}
                className="ps-store-departments-modal custom-scroll-bar"
                overlayClassName='modal-overlay'
                title='Departments'
                onCloseClick={onCloseClick}>
                    <div className='departments-modal-content'>
                        <ProductSubCategorySideNav 
                            selectedCat={browseDepartment.selectedCategory}
                            selectedSubCat={browseDepartment.selectedSubCategory}
                            store={store}/>
                    </div>
            </Modal>
        );
    }
}

StoreDepartmentsModal.PropTypes = {
    browseDepartment: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
    onCloseClick: PropTypes.func.isRequired
}

export default StoreDepartmentsModal;