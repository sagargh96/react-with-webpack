import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

import Heading from 'grommet/components/Heading';

/*style*/ import './CartHeader.module.scss';

class CartHeader extends Component {
    constructor() {
        super();
    }

    render () {
        const {
            title,
            itemCount
        } = this.props;
        const itemCountText = itemCount && itemCount > 0 ?
            '(' + itemCount + (itemCount > 1 ? ' items)' : ' item)') : '';
        return (
            <div className={'ps-cart-header'}>
                <Heading tag="h4" strong align="start">{this.props.title} {itemCountText}</Heading>
            </div>
        );
    }
}

CartHeader.PropTypes = {
    title: PropTypes.string.isRequired,
    itemCount: PropTypes.number
}

export default CartHeader;