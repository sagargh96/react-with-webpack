import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _get from 'lodash.get';

import Tabs from 'grommet/components/Tabs';
import Tab from 'grommet/components/Tab';
import FormField from 'grommet/components/FormField';
import RadioButton from 'grommet/components/RadioButton';
import ButtonWithSpinner from 'components/common/buttonWithSpinner/ButtonWithSpinner';

import {setDeliveryTimeSlot, gotoNextCheckoutStep} from './CheckoutActions';

class DeliveryTimeStep extends Component {
    constructor () {
        super();
        this._isSelectedSlot = this._isSelectedSlot.bind(this);
        this._getTimeSlots = this._getTimeSlots.bind(this);
        this._onChangeDeliverySlot = this._onChangeDeliverySlot.bind(this);
        this._getSelectedDeliveryTimeString = this._getSelectedDeliveryTimeString.bind(this);
        this._gotoNextCheckoutStep = this._gotoNextCheckoutStep.bind(this);
    }
    
    _isSelectedSlot (deliverySlot, deliveryDayIndex, deliveryTimeIndex) {
        const selectedDeliverySlot = _get(this.props, 'deliveryTime.selectedDeliverySlot');
        if (!selectedDeliverySlot) {
            return deliveryDayIndex === 0 && deliveryTimeIndex === 0 ? true : false;
        }
        if (selectedDeliverySlot.id === deliverySlot.id) {
            return true;
        }
        return false;
    }

    _onChangeDeliverySlot (deliveryTimeSlot) {
        this.props.setDeliveryTimeSlot(deliveryTimeSlot);
    }

    _gotoNextCheckoutStep () {
        this.props.gotoNextCheckoutStep(this.props.stepKey);
    }
    _getSelectedDeliveryTimeString() {
        const selectedDeliverySlot = _get(this.props, 'deliveryTime.selectedDeliverySlot');
        if (!selectedDeliverySlot) {
            return '';
        }
        return (
            <div className="summary">
                <span>{selectedDeliverySlot.day} {selectedDeliverySlot.month}, </span>
                <span>{selectedDeliverySlot.text}</span>
            </div>
        );
    }

    _getTimeSlots (deliveryDay, deliveryDayIndex) {
        let timeSlots;
        if (deliveryDay && deliveryDay.timeSlots) {
            let deliveryDaySlot = {
                day: deliveryDay.day,
                month:deliveryDay.month,
                date: deliveryDay.date,
                weekDayText: deliveryDay.weekDayText
            };
            timeSlots = deliveryDay.timeSlots.map((item, index) => {
                item = {
                    ...item,
                    ...deliveryDaySlot
                };
                return (
                    <RadioButton id={`dtSlot-${item.startTime}-${item.endTime}`} 
                        className="small"
                        key={`dtSlot-${item.startTime}-${item.endTime}`}
                        name='delivery-slot'
                        label={item.text}

                        checked={this._isSelectedSlot(item, deliveryDayIndex, index)}
                        onChange={this._onChangeDeliverySlot.bind(this, item)} />);
            });
        }
        return timeSlots;
    }
    _getDeliverySlotTabs (deliverySlots) {
        let deliverySlotTabs;
        if (deliverySlots) {
            deliverySlotTabs = deliverySlots.map((item, index) => {
                return (<Tab key={item.day} title={
                            <div className="tab-lbl">
                                <span className="day primary-text bold">{item.weekDayText.substring(0, 3)}</span>
                                <span className="date secondary-text">{item.day} {item.month.substring(0, 3).toLowerCase()}</span>
                            </div>}>
                        <div><FormField>{this._getTimeSlots(item, index)}</FormField></div>
                    </Tab>);
            });
        }
        return deliverySlotTabs;
    }
    render () {
        const {
            deliverySlots,
            selectedDeliverySlot
        } = this.props.deliveryTime;
        
        return (
            <div className="delivery-time-step-widget">
                {
                    this.props.isActive ?
                    <div className="body">
                        <div className="tab-container v-normal-bottom">
                            <Tabs className="ps-tabs" justify='start' responsive={false}>
                                {this._getDeliverySlotTabs(deliverySlots)}
                            </Tabs>
                        </div>
                        <ButtonWithSpinner label='Procced to Payment'
                            className="ps-button save-btn"
                            type='button'
                            fill={true}
                            primary={true}
                            onClick={this._gotoNextCheckoutStep}/>
                    </div>
                    :
                    this.props.isCompleted ? this._getSelectedDeliveryTimeString() : null
                }
            </div>
        );
    }
}

DeliveryTimeStep.PropTypes = {
};

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators ({
        setDeliveryTimeSlot: setDeliveryTimeSlot,
        gotoNextCheckoutStep: gotoNextCheckoutStep,
    }, dispatch)
});

const mapStateToProps = (state) => ({
    deliveryTime: state.data.checkout.deliveryTime
});


export default connect(mapStateToProps, mapDispatchToProps)(DeliveryTimeStep);