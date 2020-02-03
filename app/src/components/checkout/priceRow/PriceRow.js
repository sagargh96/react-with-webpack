import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Box from 'grommet/components/Box';

/*style*/ import './PriceRow.module.scss';

class PriceRow extends Component {
    constructor () {
        super ();
        this._getRowStyle = this._getRowStyle.bind(this);
    }
    _getRowStyle () {
        if (this.props.style === 'secondary') {
            return 'secondary-text';
        } else if (this.props.style === 'highlight') {
            return 'highlight-text small';
        } else {
            return 'primary-text bold';
        }
    }
    render () {
        const rowStyle = this._getRowStyle();
        const typeClass = this.props.type === 'charge' ? 'charge' : '';
        return (
            <div className="ps-price-row">
                <Box flex={true}
                        justify='between'
                        align="center"
                        direction='row'
                        responsive={false}
                        flex='grow'
                        className={`${rowStyle}`}>
                    <div className="price-caption">{this.props.caption}</div>
                    <div className={`price-value ${typeClass}`}>{this.props.value}</div>
                </Box>
            </div>
        );
    }
}

PriceRow.PropTypes = {
    caption: PropTypes.string.required,
    value: PropTypes.string.required,
    type: PropTypes.string,
    style: PropTypes.string
}

export default PriceRow;