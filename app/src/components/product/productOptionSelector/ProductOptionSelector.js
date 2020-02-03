import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DownIcon from 'grommet/components/icons/base/Down';
import Button from 'grommet/components/Button';

/*style*/ import './ProductOptionSelector.module.scss';
import ProductOptionModal from '../productOptionModal/ProductOptionModal';

class ProductOptionSelector extends Component {
    constructor (props) {
        super(props);
        this._onProductOptionModalOpenClicked = this._onProductOptionModalOpenClicked.bind(this);
        this._onProductOptionModalCloseClicked = this._onProductOptionModalCloseClicked.bind(this);
    }

    _onProductOptionModalOpenClicked (event) {
        event.preventDefault();
        this.props.onProductOptionModalOpen(this.props.product.id);
	}
	_onProductOptionModalCloseClicked (event) {
        event.preventDefault();
        this.props.onProductOptionModalClose(this.props.product.id);
    }

    render () {
        const {
            product,
            selectedProductOption,
            productOptionsInCart,
            productDetailLink,
            productOptionModalIsOpen,
            onAddToCartClick,
            onRemoveFromCartClick
        } = this.props;
        return (
            <div className="ps-product-option-selector">
            <Button className="ps-button hollow small" onClick={this._onProductOptionModalOpenClicked}>
                <div className="qty-unit">
                    <span>
                        {selectedProductOption.qty} {product.uom}
                    </span>
                    <span>
                        <DownIcon size="xsmall"/>
                    </span>
                </div>
            </Button>
			
			<ProductOptionModal 
                    isOpen={productOptionModalIsOpen} 
                    onCloseClick={this._onProductOptionModalCloseClicked}
                    product={product}
                    selectedProductOption={selectedProductOption}
                    productOptionsInCart={productOptionsInCart}
                    productDetailLink={productDetailLink}
                    onAddToCartClick={onAddToCartClick}
                    onRemoveFromCartClick={onRemoveFromCartClick}
                    />
            </div>
        );
    }
}

ProductOptionSelector.PropTypes = {
    productOptionModalIsOpen: PropTypes.bool,
    product: PropTypes.object.isRequired,
    selectedProductOption: PropTypes.object.isRequired,
    productOptionsInCart: PropTypes.object,
    productDetailLink: PropTypes.string.isRequired,
    
    onProductOptionModalClose: PropTypes.func,
    onProductOptionModalOpen: PropTypes.func,
    onAddToCartClick: PropTypes.func.isRequired,
    onRemoveFromCartClick: PropTypes.func.isRequired
}

export default ProductOptionSelector;