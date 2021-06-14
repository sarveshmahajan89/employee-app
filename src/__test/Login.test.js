import React from 'react';

import Login from '../component/Login.js'
import {shallow} from "enzyme/build/index";

describe('Login', function() {
    const component = shallow(<Login/>);
    it('Login renders correctly', () => {

        expect(<Login/>).toMatchSnapshot();
    });

    it('should render Login correctly with shallow', function () {

        expect(component).toMatchSnapshot();
    });

});