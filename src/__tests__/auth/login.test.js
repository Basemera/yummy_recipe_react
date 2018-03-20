import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount } from 'enzyme';
import { MemoryRouter, Route } from 'react-router-dom';
import LogIn from '../../components/login';
import loginCard from '../../components/loginCard';

const setUp = (username, password) => {
    const props = {
        username,
        password,
        handleInputChange: () => {},
        onClick: () => {},
    };
    return shallow(<logIn {...props} />);
};

describe('<LogIn/>', () => {
    it('renders Sign in component', () => {
        const wrapper = mount(<MemoryRouter initialEntries={['/login']}>
            <Route
                exact
                path="/login"
                render={() => <LogIn dispatch={() => {}} />}
            />
        </MemoryRouter>);
        expect(wrapper.find(LogIn)).toHaveLength(1);
    });

    it('should render <LoginCard /> component', () => {
        const wrapper = shallow(<LogIn />);
        expect(wrapper.length).toEqual(1);
    });
});
