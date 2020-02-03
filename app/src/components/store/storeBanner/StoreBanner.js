import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import Slider from 'react-slick';

import Label from 'grommet/components/Label';
import Carousel from 'grommet/components/Carousel';
import Image from 'grommet/components/Image';
import Box from 'grommet/components/Box';
import NextIcon from 'grommet/components/icons/base/Next';

/*style*/ import './StoreBanner.module.scss';
import ImageLazyLoader from 'components/common/imageLazyLoader/ImageLazyLoader';

//import { ImageLazyLoader } from 'components/common';

class StoreBanner extends Component {
    constructor () {
        super ();
    }
    render () {
        const {
            bannerList
        } = this.props;
        const hasBanners = bannerList && bannerList.length > 1;
        const sliderSettings = {
            dots: false,
            autoPlay: hasBanners,
            autoPlaySpeed: 5000,
            infinite: hasBanners,
            arrows: hasBanners
        };
        return (
            <div className='ps-store-banner'>
                <Carousel autoplay={true}>
                    {
                        bannerList.map((banner, index) => (
                            <div className='banner-item' key={banner.id}>                            
                                <ImageLazyLoader src={banner.img} 
                                    preLoader='{()=><Spinning/>}'>
                                    <span className='secondary-text'>{banner.name} image</span>
                                </ImageLazyLoader>
                            </div>
                        ))
                    }
                </Carousel>
            </div>
        )
    }
}

StoreBanner.PropTypes = {
    bannerList: PropTypes.object.isRequired
}

export default StoreBanner;