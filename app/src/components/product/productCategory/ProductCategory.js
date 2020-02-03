import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import LinesEllipsis from 'react-lines-ellipsis';

import Box from 'grommet/components/Box';
import NextIcon from 'grommet/components/icons/base/Next';

/*style*/ import './ProductCategory.module.scss';
import ImageLazyLoader from 'components/common/imageLazyLoader/ImageLazyLoader';
import categoryImg from 'images/category.jpg';
//import { ImageLazyLoader } from 'components/common';

class ProductCategory extends Component {
    constructor () {
        super ();
    }
    render () {
        const {
            category
        } = this.props;
        const basePath = this.props.basePath || '';
        return (
            <div className='ps-product-category'>
            <Link to={`${basePath}/${category.seoName}`}>
                <Box className='category-content' direction='row' responsive={false} justify='between'>                    
                        <Box alignSelf='start'>
                            <div className='category-image'>
                                <ImageLazyLoader src={categoryImg} 
                                                preLoader='{()=><Spinning/>}'>
                                                <span className='secondary-text'>{category.name} image</span>
                                </ImageLazyLoader>
                            </div>
                        </Box>
                        <Box className='category-details' basis="full" alignSelf='center'>
                            <div className='category-name'>
                                <h4>{category.name}</h4>
                            </div>
                            <div className='category-description secondary-text small'>
                                <LinesEllipsis maxLine='2' basedOn='letters' text={category.description}/>
                            </div>
                            </Box>
                    <Box alignSelf='center'>
                        <NextIcon size='small'/>
                    </Box>
                </Box>
            </Link>
            </div>
        );
    }
}

ProductCategory.PropTypes = {
    category: PropTypes.object.isRequired,
    basePath: PropTypes.string
}

export default ProductCategory;