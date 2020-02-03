import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/*style*/ import './ProductOptionModal.module.scss';
import Modal from 'components/common/modal/Modal';
import ProductOptionDetail from 'components/product/productOptionDetail/ProductOptionDetail';
import ProductOptionList from 'components/product/productOptionList/ProductOptionList';

class ProductOptionModal extends Component {
    constructor () {
        super ();
    }

    render () {
        const {
            isOpen,
            onCloseClick,
            productDetailLink,
            product,
            selectedProductOption,
            productOptionsInCart,
            onAddToCartClick,
            onRemoveFromCartClick
        } = this.props;
        
        return (
            <Modal
                isOpen={isOpen}
                closer
                contentLabel='Modal'
                shouldCloseOnOverlayClick={true}
                className="ps-product-option-modal"
                overlayClassName='modal-overlay'
                onCloseClick={onCloseClick}>
                   <div className='ps-product-option-list row'>
                        <div className="column small-12 medium-5 large-5 no-padding">
                            <ProductOptionDetail product={product} 
                                viewDetailLink={productDetailLink}/>
                        </div>
                        <div className="column small-12 medium-7 large-7 no-padding">
                            <ProductOptionList selectedProductOption={selectedProductOption} 
                                productOptions={product.productOptions}
                                uom={product.uom}
                                productOptionsInCart={productOptionsInCart}
                                onAddToCartClick={onAddToCartClick}
                                onRemoveFromCartClick={onRemoveFromCartClick}/>
                        </div>
                    </div>
            </Modal>
        );
    }
}

ProductOptionModal.PropTypes = {
    isOpen: PropTypes.object.isRequired,
    onCloseClick: PropTypes.func,
    product: PropTypes.object.isRequired,
    selectedProductOption: PropTypes.object.isRequired,
    productOptionsInCart: PropTypes.object,
    productDetailLink: PropTypes.string.isRequired,
    onAddToCartClick: PropTypes.func.isRequired,
    onRemoveFromCartClick: PropTypes.func.isRequired
}

export default ProductOptionModal;