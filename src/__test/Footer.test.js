import React from 'react';

import Footer from '../component/Footer.js'
import {shallow} from "enzyme/build/index";

describe('Footer', function() {
    it('Footer renders correctly', () => {

        expect(<Footer/>).toMatchSnapshot();
    });

    it('should render Footer correctly with shallow', function () {

        const component = shallow(<Footer/>);
        expect(component).toMatchSnapshot();
    });

    it('should render Footer correctly h3 elements', function () {

        const component = shallow(<Footer/>);
        const text = component.find('h3').text();
        expect(text).toEqual('About Employee Converter App');
    });
});