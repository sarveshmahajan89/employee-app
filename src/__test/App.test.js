import React from 'react';
import App from '../component/App.js';
import {shallow} from "enzyme/build/index";

describe('App', function() {
    const component = shallow(<App/>);
    const div = component.find('div');

    it('App renders correctly', () => {
        expect(<App/>).toMatchSnapshot();
    });
    it('should render App correctly with shallow', function () {

        expect(component).toMatchSnapshot();
    });

    it('App should render Navigation elements correctly', function () {
        expect(div.exists('Navigation')).toBe(true);
    });

    it('App should render Router elements correctly', function () {

        expect(div.exists('Router')).toBe(true);
    });

    it('App should render Footer elements correctly', function () {

        expect(div.exists('Footer')).toBe(true);
    });
});