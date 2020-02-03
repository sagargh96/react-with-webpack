import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import classnames from 'classnames';

/*style*/ import './ProductCarousel.module.scss';
import CarouselArrow from 'components/common/carouselArrow/CarouselArrow';

class ProductCarousel extends Component {
    constructor () {
		super ();
		this.getProductSlides = this.getProductSlides.bind(this);
		this.sliderSettings = {
            dots: false,
            autoplay: false,
            speed: 500,
            infinite: false,
            slidesToScroll: 5,
            slidesToShow: 5,
            variableWidth: true,
            responsive: [{
                breakpoint: 851,
                settings: {slidesToScroll: 4, slidesToShow: 4}
            },{
                breakpoint: 1020,
                settings: {slidesToScroll: 5, slidesToShow: 5}
            },{
                breakpoint: 492,
				speed: 1000,
                settings: {slidesToScroll: 1, slidesToShow: 2}
            }],
            prevArrow: (
                <CarouselArrow
                    direction="prev"
                    label="Previous Product"
                />
            ),
            nextArrow: (
                <CarouselArrow
                    direction="next"
                    label="Next Product"
                />
            )
        };
	}
	getProductSlides (slideList) {
		return slideList.map((slide, index) => {
			return(
			<div className='slide' key={index}>
				{slide}
			</div>)
		});
	}
    render () {
		const classes = classnames({
            'carousel-wrapper': true,
            'plain-slider': this.props.isPlainSlider
        });
        return (
            <div className='ps-product-carousel'>
                <div className={classes}>
					{this.props.isPlainSlider ?					
					this.getProductSlides(this.props.children)
					:               
                    <Slider {...this.sliderSettings}>
                        {this.getProductSlides(this.props.children)}
                    </Slider>}
                </div>
            </div>
        );
    }
}

export default ProductCarousel;