import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classNames from 'classnames';

import Heading from 'grommet/components/Heading';

/*style*/ import './Modal.module.scss'

class Modal extends Component {
    constructor (props) {
        super(props);
    }

    render () {
        const align = this.props.align || 'center';
        const modalClassName = ('ps-modal grommet') + 
            (align === 'center' ? ' center' : '');
        const modalOverlayClassName = ('modal-overlay') + 
                (align === 'center' ? ' center' : '');
        const invertClass = this.props.isInvert ? 'invert' : '';
        const modalCloser = this.props.closer ?
                        (<div className={`modal-closer ${invertClass}`}><button
                            onClick={this.props.onCloseClick}
                            aria-label={this.props.ariaLabel}
                            disabled={this.props.disabled}>&times;</button></div>)
                        : null;
        const modalHeader = this.props.title ?
                        (
                            <div className={'modal-header'}>
                                <Heading tag="h4" strong align="start">{this.props.title}</Heading>
                                {modalCloser}
                            </div>
                        ) : null;
        const modalContent = 
            (<ReactCSSTransitionGroup
                            transitionName={"modal-content--align-" + align + "-"}
                            transitionAppear
                            transitionAppearTimeout={400}
                            transitionEnter={false}
                            transitionLeave
                            transitionLeaveTimeout={400}
                        >
                    { this.props.isOpen && (
                    <div className={'modal-content--align-' + align + ' ' + this.props.className}>
                        {modalHeader}
                        {!this.props.title ? modalCloser : null }
                        {this.props.children}
                    </div>) }
            </ReactCSSTransitionGroup>)
        return (
            <ReactModal
                isOpen = {this.props.isOpen}
                contentLabel='Modal'
                shouldCloseOnOverlayClick
                closeTimeoutMS={400-5}
                onRequestClose={() => this.props.onCloseClick()}
                className={modalClassName}
                appElement={this.props.appElement || document.getElementById('app')}
                overlayClassName={modalOverlayClassName}>
                    { modalContent }
            </ReactModal>
        );
    }
}

Modal.PropTypes = {
    areaLabel: PropTypes.string.isRequired,
    title: PropTypes.string,
    closer: PropTypes.bool,
    onCloseClick: PropTypes.func,
    disabled: PropTypes.bool,
    align: PropTypes.string,
    isOpen: PropTypes.bool,
    isInvert: PropTypes.bool
}

export default Modal;