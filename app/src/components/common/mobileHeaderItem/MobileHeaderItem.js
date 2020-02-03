import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Anchor from 'grommet/components/Anchor';
import Button from 'grommet/components/Button';

/*style*/ import './MobileHeaderItem.module.scss';
import NumberBadge from 'components/common/numberBadge/NumberBadge';

class MobileHeaderItem extends Component {
    constructor (props) {
        super(props);
    }

    renderInnerContent (text, icon, badgeText) {
        return (
        <div>
            <span className="item-icon">
                {icon}                                   
            {
                badgeText ?
                <NumberBadge type="plain">{badgeText}</NumberBadge> : null
            }
            </span>                
            {
                text ?
                <div className='item-text'>
                    {text}
                </div> : null
            }
        </div>
        );
    }

    render () {
        const {
            text,
            icon,
            badgeText,
            isActive = false,
            tabIndex,
            path,
            onClick
        } = this.props;
        const classNames = classnames({
            'ps-mobile-header-item': true,
            'active': isActive
        });
        return (
            <div className={`${classNames}`} tabIndex={tabIndex}>
                {
                    path ? 
                        <Anchor path={path}>
                        {this.renderInnerContent(text, icon, badgeText)}</Anchor>
                    :
                    <Button onClick={onClick}>                        
                        {this.renderInnerContent(text, icon, badgeText)}
                    </Button>
                }
            </div>
        );
    }
}

MobileHeaderItem.PropTypes = {
    text: PropTypes.string,
    icon: PropTypes.object.isRequired,
    badgeText: PropTypes.string,
    isActive: PropTypes.boolean
};

export default MobileHeaderItem;