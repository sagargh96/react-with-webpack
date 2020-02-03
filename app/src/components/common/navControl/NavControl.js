import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Button from 'grommet/components/Button';

/*style*/ import './Navcontrol.module.scss';

class NavControl extends Component {
    constructor(props) {
        super(props);
        this.state = { active: props.active };
        this._onClick = this._onClick.bind(this);
    }
    _onClick (event) {
        event.preventDefault();
        let isActive = !this.state.active;
        let _props = this.props;
        console.log("isActive: " + isActive);
        this.setState({ active: isActive }, function () {
            _props.onNavClick(isActive);
        }.bind(this));
    }
    render() {
        const { active } = this.state;

        return (
            <div className='ps-navcontrol'>
                <Button className={classNames('ps-hamburger', 'ps-hamburger--htx', 
                    'small', {'active': this.state.active})} 
                            onClick={this._onClick}>
                        <span>toggle menu</span>
                    </Button>
            </div>
        );
    }
};

NavControl.defaultProps = {
    active: false
};

NavControl.propTypes = {
    active: PropTypes.bool,
    onNavClick: PropTypes.func
};

export default NavControl;
