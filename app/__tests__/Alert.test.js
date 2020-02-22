import React, { Component } from 'react';
import {shallow} from 'enzyme';

import Alert from '../src/components/common/alert/Alert';

function setup() {
    const props = {
        type: 'error',
        text: 'sagar'
    }
    const wrapper = shallow(<Alert />);
    return {wrapper, props};
}

describe("Alert component test suite", () => {
    it("should have rendered", () => {
        // const {wrapper} = setup();
        const props = {
            type: 'error',
            text: 'sagar'
        }
        const component = shallow(<Alert type={props.type} text={props.text} />);
        console.log(component);
        const text = component.find('span').text();
        expect(text).toEqual('sagar');
        // expect(component).toMatchSnapshot();

    })

    // it('should render alert text correctly with given strings', () => {
    //     const type = ['one', 'two'];
    //     const component = shallow(<MyComponent list={strings} />);
    //     expect(component).toMatchSnapshot();
    //   });
})