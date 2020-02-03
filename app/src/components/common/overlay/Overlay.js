import React, { Component } from 'react';
import PropTypes from 'prop-types';

/*style*/ import './Overlay.module.scss';

class Overlay extends Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <div className='ps-overlay'>
                <div className='table'>
                    <div className='table-cell'>
                        <div className='overlay-content'>
                            <div className='content-wrapper'>
                                {this.props.render()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Overlay.PropTypes = {
    render: PropTypes.func.isRequired
};

export default Overlay;