import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from 'grommet/components/Button';
import Anchor from 'grommet/components/Anchor';
import LinkNextIcon from 'grommet/components/icons/base/LinkNext';

/*style*/ import './Avatar.module.scss';

class Avatar extends Component {
    constructor () {
        super ();
    }
    render () {
        const {
            text,
            link,
            isInvert
        } = this.props;
        const invertClass = isInvert ? "invert" : "";
        return (
            <div className='ps-avatar '>
                <Anchor path={link} className={`${invertClass}`}><span className='avatar-text'>{text}</span></Anchor>
            </div>
        );
    }
}

Avatar.PropTypes = {
    text: PropTypes.string.isRequired,
    link: PropTypes.func.stirng,
    isInvert: PropTypes.boolean
}

export default Avatar;