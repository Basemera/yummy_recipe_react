import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import SignUp from '../../components/signUp'
import SignUpCard from '../../components/signUpCard'
import { shallow } from 'enzyme';


describe('<SignUpCard/>', function () {
    it('registers a user', function () {
      const wrapper = shallow(<SignUpCard />);
      expect(wrapper.find('p').text()).toEqual(' Fill in the details and sign up to enjoy the app benefits');
});

it('registers a user', function () {
    const wrapper = shallow(<SignUpCard />);
    expect(wrapper.find('h2').text()).toEqual(' Register');
});
});

const setUp = (username, email, firstname, password, confirm_password) => {
    const props = {
        username,
        email,
        firstname,
        password,
        confirm_password,
        handleInputChange: () => {

        },
        onClick: () => {

        },
    };
    return shallow(<SignUpCard {...props}/>)
};

describe('<SignUpCard/>', () => {
    it('has username field', () => {
        const wrapper = setUp('Phiona', 'bas@gmail.com', 'Phiona', 1234567890, 1234567890);
        const input = wrapper.find('input').at(0);
        expect(input.props().name).toEqual('username');
        expect(input.props().placeholder).toEqual('Basemera');
        expect(input.props().required).toEqual(true);
        expect(input.props().value).toEqual('Phiona');
        expect(input.simulate('click'));
        expect(input.simulate('change'));
    })

    it('has email field', () => {
        const wrapper = setUp('Phiona', 'bas@gmail.com', 'Phiona', 1234567890, 1234567890);
        const input = wrapper.find('input').at(1);
        expect(input.props().name).toEqual('email');
        expect(input.props().placeholder).toEqual('basemera@example.com');
        expect(input.props().required).toEqual(true);
        expect(input.props().value).toEqual('bas@gmail.com');
        expect(input.simulate('click'));
        expect(input.simulate('change'));
    }) 
    
    it('has firstname field', () => {
        const wrapper = setUp('Phiona', 'bas@gmail.com', 'Phiona', 1234567890, 1234567890);
        const input = wrapper.find('input').at(2);
        expect(input.props().name).toEqual('firstname');
        expect(input.props().placeholder).toEqual('Basenmera');
        expect(input.props().required).toEqual(true);
        expect(input.props().value).toEqual('Phiona');
        expect(input.simulate('click'));
        expect(input.simulate('change'));
    })
    
    it('has password field', () => {
        const wrapper = setUp('Phiona', 'bas@gmail.com', 'Phiona', 1234567890, 1234567890);
        const input = wrapper.find('input').at(3);
        expect(input.props().name).toEqual('password');
        expect(input.props().placeholder).toEqual('password');
        expect(input.props().required).toEqual(true);
        expect(input.props().value).toEqual(1234567890);
        expect(input.props().type).toEqual('password');
        expect(input.simulate('click'));
        expect(input.simulate('change'));
    })

    it('has confirm_password field', () => {
        const wrapper = setUp('Phiona', 'bas@gmail.com', 'Phiona', 1234567890, 1234567890);
        const input = wrapper.find('input').at(4);
        expect(input.props().name).toEqual('confirm_password');
        expect(input.props().placeholder).toEqual('password');
        expect(input.props().required).toEqual(true);
        expect(input.props().value).toEqual(1234567890);
        expect(input.props().type).toEqual('password');
        expect(input.simulate('click'));
        expect(input.simulate('change'));
    }) 

    it('submit button', () => {
        const wrapper = setUp('Phiona', 'bas@gmail.com', 'Phiona', 1234567890, 1234567890);
        const input = wrapper.find('button').at(0);
        expect(input.props().type).toEqual('submit');
        expect(input.props().value).toEqual('Sign up');
      });

    it('Login link', () => {
        const wrapper = setUp('Phiona', 'bas@gmail.com', 'Phiona', 1234567890, 1234567890);
        const input = wrapper.find('Link').at(0);
        expect(input.props().name).toEqual('login');
    }); 

    it('Form exists', () => {
        const wrapper = setUp('Phiona', 'bas@gmail.com', 'Phiona', 1234567890, 1234567890);
        const input = wrapper.find('form').at(0);
        expect(input.props().name).toEqual('sign-up');
        expect(input.simulate('submit'));
    }) ; 

    it('renders five label elements', () => {
        const wrapper = setUp('Phiona', 'bas@gmail.com', 'Phiona', 1234567890, 1234567890);
        expect(wrapper.find("label")).toHaveLength(5);
})
});
