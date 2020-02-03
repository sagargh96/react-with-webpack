import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import Heading from 'grommet/components/Heading';

import ImageLazyLoader from 'components/common/imageLazyLoader/ImageLazyLoader';
import prodImg from 'images/prod_img_3.jpg';

class ProductOptionDetail extends Component {
    render () {
        const {
            product,
            viewDetailLink
        } = this.props;
        return (
            <div className="ps-product-option-detail">
                <div className="product-img">
                    <ImageLazyLoader src={prodImg} 
                        preLoader='{()=><Spinning/>}'>
                        <span className='secondary-text'>{product.name} image</span>
                    </ImageLazyLoader>
                </div>
                <Heading tag="h3" strong={true}>{product.name}</Heading>
                <Link to={viewDetailLink} onClick={(e) => console.log('abcd')}>View details</Link> 
            </div>
        );
    }
}

ProductOptionDetail.PropTypes = {
    product: PropTypes.object.isRequired,
    viewDetailLink: PropTypes.string.isRequired,
    selectedProductOption: PropTypes.object,
}

export default ProductOptionDetail;