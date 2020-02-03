import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { bindActionCreators } from 'redux';

import Box from 'grommet/components/Box';

/*style*/ import './ZipCodeChecker.module.scss';
import AccountZipCodeOverlay from 'components/account/accountZipCodeOverlay/AccountZipCodeOverlay';

//import { AccountZipCodeOverlay } from 'components/account';

class ZipCodeChecker extends Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <div className='ps-zipcode-checker'>
                <AccountZipCodeOverlay 
                    onZipCodeSubmit={()=>{return null}}
                    onSignInClicked={()=>{return null}}/>
            </div>

        )
    }
}

ZipCodeChecker.PropTypes = {
}

export default ZipCodeChecker;