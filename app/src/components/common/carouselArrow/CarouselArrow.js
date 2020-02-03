import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Button from 'grommet/components/Button';
import NextIcon from 'grommet/components/icons/base/Next';
import PreviousIcon from 'grommet/components/icons/base/Previous';

/*style*/ import './CarouselArrow.module.scss';

class CarouselArrow extends Component {
    constructor () {
        super ();
    }
    render () {
        const {
            hide,
            direction,
            onClick,
            label           
        } = this.props;
        const classNames = classnames(
            {
                'ps-carousel-arrow': true,
                'next': direction === 'next',
                'prev': direction === 'prev',
                'previous': direction === 'previous'
            }
        );

        return (
            <div className={classNames}>
                <Button icon={direction === 'next' ? <NextIcon /> : <PreviousIcon/> }
                    onClick={onClick}/>
            </div>
        );
    }
}

CarouselArrow.PropTypes = {
    hide: PropTypes.bool,
    direction: PropTypes.string,
    label: PropTypes.string,
    onClick: PropTypes.func
}

export default CarouselArrow;