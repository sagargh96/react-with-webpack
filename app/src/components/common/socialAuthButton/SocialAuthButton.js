import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import Button from 'grommet/components/Button';
import SocialGooglePlusIcon from 'grommet/components/icons/base/SocialGooglePlus';
import SocialFacebookIcon from 'grommet/components/icons/base/SocialFacebookOption';

/*style*/ import './SocialAuthButton.module.scss'

class SocialAuthButton extends Component {
    constructor () {
        super ();
        this._onClick = this._onClick.bind(this);
        this._getSocialIcon = this._getSocialIcon.bind(this);
    }
    _onClick () {        
        window.open(this.props.authUrl, this.props.target, 
        "height=700,width=700,status=yes,toolbar=no,menubar=no,location=no")
    }
    _getSocialIcon () {
        if (this.props.type === 'google') {
            return <SocialGooglePlusIcon className="white-icon"/>;
        } else if (this.props.type === 'facebook') {
            return <SocialFacebookIcon className="white-icon"/>;
        }
        return null;
    }
    render () {
        const {
            type,
            label,
            authUrl,
            target
        } = this.props; 
        const socialIcon = this._getSocialIcon();
        return (
            <Button icon={socialIcon} className={`ps-social-auth-button ps-button ${type}`} 
                label={label}
                primary={true}
                onClick={this._onClick}
                fill={true}/>
        );
    }
}

SocialAuthButton.PropTypes = {
    type: PropTypes.oneOf(['google', 'facebook']),
    label: PropTypes.string.isRequired,
    authUrl: PropTypes.string.isRequired,
    target: PropTypes.oneOf(['_blank', '_self'])
}

export default SocialAuthButton;