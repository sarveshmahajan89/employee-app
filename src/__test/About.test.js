import React from 'react';
import { shallow } from 'enzyme';

import About from '../component/About.js';

describe('About', function() {
    const component = shallow(<About/>);

    it('About renders correctly', () => {

        expect(<About/>).toMatchSnapshot();
    });

    it('should render About correctly with shallow', function() {

        expect(component).toMatchSnapshot();
    });

    it('About should render h1 elements correctly', function () {

        const text = component.find('h1').text();
        expect(text).toEqual('About us');
    });

    it('About should render p elements correctly', function () {

        const text = component.find('p').text();
        expect(text).toEqual('Employee Converter App');
    });
});