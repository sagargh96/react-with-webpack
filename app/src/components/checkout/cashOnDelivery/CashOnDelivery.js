import React, { Component } from 'react';
import PropTypes from 'prop-types';

import OrSeparator from 'components/common/orSeparator/OrSeparator';
import Button from 'grommet/components/Button';

/*style*/ import './CashOnDelivery.module.scss';

class CashOnDelivery extends Component {
    constructor () {
        super ();
    }
    render () {
        const {
            options,
            amountPayable,
            amountErrorMessage,
            imgBasePath
        } = this.props;
        const codOption = options[0];
        const cowOption = options.length >= 2? options[1] : null;
        return (
            <div className="ps-cash-on-delivery">
                <img
                    alt="Cash on delivery - image"
                    className="cod-img"
                    src={imgBasePath + '/' + codOption.imgName}
                />
                <div className="v-normal-top">
                    {
                        amountPayable > 5000 ?
                        (<div>
                            {amountErrorMessage}
                        </div>)
                        :
                        (<div>
                            <div className="cod-msg">{codOption.message.replace('||amount||', '₹' + amountPayable)}</div>
                            {
                                cowOption ?
                                <div>
                                    <OrSeparator className='v-small' text="Or"/>
                                    <div className="cow-msg">
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: cowOption.message
                                            }}
                                        />
                                    </div>
                                    <img
                                        alt="Paytm wallet - image"
                                        className="cow-img"
                                        src={imgBasePath + '/' + cowOption.imgName}
                                    />
                                </div> : null
                            }
                        </div>)

                    }
                </div>
                <Button label='Place Order'
                            className="ps-button place-order"
                            type='button'
                            fill={true}
                            primary={true}
                            onClick={() => this.props.onSubmitOrderClicked(codOption.id)}/>
            </div>
        );
    }
}

CashOnDelivery.PropTypes = {
}

export default CashOnDelivery;