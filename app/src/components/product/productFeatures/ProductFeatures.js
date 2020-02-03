import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LinesEllipsis from 'react-lines-ellipsis';

/*style*/ import './ProductFeatures.module.scss';

class ProductFeatures extends Component {
    constructor (props) {
        super(props);
    }

    render () {
        const {
            productFeatures
        } = this.props;        
        return (
            <div className='ps-product-features'>
                <ul>
                {
                    productFeatures.map((productFeature, index) => {
                        return (
                            <li key={index}>
                                <div className="product-feature v-normal-top">
                                    <h4 className='title'>{productFeature.title}</h4>
                                    <div>{productFeature.value}</div>
                                </div>
                            </li>
                        );
                    })
                }
                </ul>
            </div>
        );
    }
}

ProductFeatures.PropTypes = {
    productFeatures: PropTypes.object,
}

export default ProductFeatures;