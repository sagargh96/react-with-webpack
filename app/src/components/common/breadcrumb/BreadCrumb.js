import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from 'grommet/components/Button';
import Label from 'grommet/components/Label';
import Anchor from 'grommet/components/Anchor';

/*style*/ import './Breadcrumb.module.scss';

class Breadcrumb extends Component {
    constructor () {
        super ();
    }
    render () {
        const {
            items
        } = this.props;
        const basePath = this.props.basePath || '';
        return (
            <div className='ps-breadcrumb'>
                <ul className=' inline'>
                    <li>
                        <Anchor path={basePath}>Home</Anchor>
                    </li>
                    {
                        items.map((breadcrumb, index, list) => {
                            return (
                                <li key={index}>
                                    {
                                        index === list.length - 1 ?
                                        (<span>{breadcrumb.name}</span>)
                                        :
                                        (<Anchor path={`${basePath}/${breadcrumb.link}`}>{breadcrumb.name}</Anchor>)
                                    }                                    
                                </li>
                            );
                        })
                    } 
                </ul>
            </div>
        );
    }
}

Breadcrumb.PropTypes = {
    items: PropTypes.array,
    basePath: PropTypes.string
}

export default Breadcrumb;