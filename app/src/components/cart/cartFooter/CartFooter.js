import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from 'grommet/components/Button';
import Label from 'grommet/components/Label';
import Anchor from 'grommet/components/Anchor';
import LinkNextIcon from 'grommet/components/icons/base/LinkNext';

/*style*/ import './CartFooter.module.scss';

class CartFooter extends Component {
    constructor () {
        super ();
    }
    render () {
        const {
            totalAmount,
            onCheckoutClick
        } = this.props;
        return (
            <div className='ps-cart-footer'>
                <div className='promo-wrapper'>
                    <Anchor label='Have a promo code ?' onClick={onCheckoutClick} primary={true}/>
                </div>
                <div className='checkout-btn v-small-top'>
                    <Button className='ps-button hover-effect' icon={<LinkNextIcon />} 
                        label={ <span><span className='total-amount align-left'>₹{totalAmount}</span> 
                                <span className='align-right'>Proceed to checkout</span></span>}
                        onClick={onCheckoutClick}
                        primary={true} plain={false} fill={false}>
                    </Button>
                </div>
            </div>
        );
    }
}

CartFooter.PropTypes = {
    totalAmount: PropTypes.number.isRequired,
    onCheckoutClick: PropTypes.func.isRequired
}

export default CartFooter;