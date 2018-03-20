import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';

import { Enzyme, mount, shallow } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';
import SignUp from '../../components/signup';
import SignUpCard from '../../components/signUpCard';

// Enzyme.configure({ adapter: new Adapter() });

const setUp = (username, email, firstname, password, confirm_password) => {
    const props = {
        username,
        email,
        firstname,
        password,
        confirm_password,
        handleInputChange: () => {},
        onClick: () => {},
    };
    return shallow(<SignUpCard {...props} />);
};

describe('<SignUp/>', () => {
    it('renders Sign up component', () => {
        const wrapper = mount(<MemoryRouter initialEntries={['/signup']}>
            <Route
                exact
                path="/signup"
                render={() => <SignUp dispatch={() => {}} />}
            />
        </MemoryRouter>);
        expect(wrapper.find(SignUp)).toHaveLength(1);
    });

    it('renders five label elements', () => {
        const wrapper = setUp(
            'Phiona',
            'bas@gmail.com',
            'Phiona',
            1234567890,
            1234567890,
        );
        expect(wrapper.find('Redirect')).toHaveLength(0);
    });

    it('should render <Redirect /> component', () => {
        const wrapper = shallow(<SignUp />);
        expect(wrapper.length).toEqual(1);
    });

    it('should render <SignUpCard /> component', () => {
        const wrapper = shallow(<SignUp />);
        expect(wrapper.length).toEqual(1);
    });
});
