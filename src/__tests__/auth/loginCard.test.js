import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount } from 'enzyme';
import { MemoryRouter, Route } from 'react-router-dom';
import LogIn from '../../components/login';
import LoginCard from '../../components/loginCard';

const setUp = (username, password) => {
    const props = {
        username,
        password,
        handleInputChange: () => {},
        onClick: () => {},
    };
    return shallow(<loginCard {...props} />);
};

describe('<loginCard/>', () => {
    const wrapper = shallow(<LoginCard />);
    it('renders a p element', () => {
        expect(wrapper.find('p')).toHaveLength(1);
    });

    it('renders an h1 element', () => {
        expect(wrapper.find('h1')).toHaveLength(0);
        expect(wrapper.find('h1').text()).toEqual('Please sign in');
    });

    it('has username field', () => {
        const input = wrapper.find('input').at(0);
        expect(input.props().name).toEqual('username');
        expect(input.props().placeholder).toEqual('Enter your username');
        expect(input.props().required).toEqual(true);
        expect(input.simulate('click'));
        expect(input.simulate('change'));
    });

    it('has username field', () => {
        // const wrapper = setUp('Phiona', 1234567890);
        const wrapper = shallow(<LoginCard />);
        const input = wrapper.find('input').at(1);
        expect(input.props().name).toEqual('password');
        expect(input.props().placeholder).toEqual('Enter your password');
        expect(input.props().required).toEqual(true);
        expect(input.simulate('click'));
        expect(input.simulate('change'));
    });

    it('submit button', () => {
        const input = wrapper.find('button').at(0);
        expect(input.props().type).toEqual('submit');
        expect(input.props().value).toEqual('log in');
    });

    it('Form exists', () => {
        const input = wrapper.find('form').at(0);
        expect(input.props().name).toEqual('sign-up');
        expect(input.simulate('submit'));
    });
});
