import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

import Button from 'grommet/components/Button';
import AddIcon from 'grommet/components/icons/base/Add';
import SubtractIcon from 'grommet/components/icons/base/Subtract';
import Box from 'grommet/components/Box';
import Label from 'grommet/components/Label';

/*style*/ import './CartItemAddRemoveBtn.module.scss';

class CartItemAddRemoveBtn extends Component {
    constructor () {
        super ();
    }
    render () {
        const {
            itemCount,
            itemCountText,
            itemQty,
            itemInventory,
            onIncCartItemCountClick,
            onDecCartItemCountClick
        } = this.props;
        return (
            <div className='ps-cart-item-add-remove-btn'>
                {itemCount && itemCount > 0 ? 
                    (
                        <Box flex={true}
                            justify='start'
                            align="center"
                            direction='row'
                            responsive={false}
                            flex='grow'>
                            <Box alignSelf='start'>
                                <Button className='ps-button add-btn hover-effect' icon={<AddIcon colorIndex='brand' size='small'/>}
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation(); 
                                    e.nativeEvent.stopImmediatePropagation(); 
                                    onIncCartItemCountClick();
                                }} 
                                plain={false}
                                size='small' fill={false}/>
                            </Box>
                            <Box className='item-qty' alignSelf='start' flex='grow'>
                                <Label className='primary-text'>{itemCount}
                                    {
                                        itemCountText ?
                                            <span className='item-qty-text hide-for-small-only secondary-text'> {itemCountText}</span>
                                            : null
                                    }                                    
                                </Label>
                            </Box>

                            <Box alignSelf='start'>
                                <Button className='ps-button remove-btn hover-effect' 
                                icon={<SubtractIcon colorIndex='brand' size='small'/>}
                                onClick={(e) => {
                                    e.preventDefault(); 
                                    onDecCartItemCountClick();
                                }} 
                                plain={false}
                                size='small' fill={false}/>
                            </Box>
                        </Box>
                    ) : (
                        <Button className="ps-button no-item hover-effect"
                        onClick={(e) => {
                            e.preventDefault();
                            onIncCartItemCountClick();
                        }} 
                        label='Add to cart' plain={false}
                        size='small' fill={false}/>
                    )
                }
            </div>
        );
    }
}

CartItemAddRemoveBtn.PropTypes = {
    itemCount: PropTypes.number,
    itemCountText: PropTypes.string,
    itemQty: PropTypes.number,
    itemInventory: PropTypes.number,
    onIncCartItemCountClick: PropTypes.func.isRequired,
    onDecCartItemCountClick: PropTypes.func.isRequired
}

export default CartItemAddRemoveBtn;