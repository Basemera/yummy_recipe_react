import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Login from '../../components/login';
import loginCard from '../../components/loginCard';
import { shallow, mount } from 'enzyme';
import { MemoryRouter, Route } from 'react-router-dom';

const setUp = (username, password) => {
    const props = {
        username,
        password,
        handleInputChange: () => {},
        onClick: () => {},
    };
    return shallow(<login {...props} />);
};

describe('<Login/>', () => {
    it('renders Sign in component', () => {
        const wrapper = mount(<MemoryRouter initialEntries={['/login']}>
            <Route
                exact
                path="/login"
                render={() => <Login dispatch={() => {}} />}
            />
        </MemoryRouter>);
        expect(wrapper.find(Login)).toHaveLength(1);
    });

    it('should render <LoginCard /> component', () => {
        const wrapper = shallow(<Login />);
        expect(wrapper.length).toEqual(1);
    });
});
