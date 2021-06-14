import React from 'react';

import Navigation from '../component/Navigation.js'
import {shallow} from "enzyme/build/index";

describe('Navigation', function() {
    const component = shallow(<Navigation/>);
    it('Navigation renders correctly', () => {

        expect(<Navigation/>).toMatchSnapshot();
    });

    it('should render Navigation correctly with shallow', function () {

        expect(component).toMatchSnapshot();
    });

    it('should render Navigation correctly a elements', function () {

        const text = component.find('button').text();
        expect(text).toEqual('Menu');
    });

    it('should render Navigation correctly li elements', function () {

        expect(component.find('ul').closest('li')).toBeTruthy();
    });
});