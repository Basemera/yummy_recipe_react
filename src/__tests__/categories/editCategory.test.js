import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount } from 'enzyme';
import EditCategory from '../../components/categories/editCategory';

const setUp = (category_name, category_id) => {
    const props = {
        category_name,
        handleInputChange: () => {},
        onClick: () => {},
        match: {
            params: {
                category_id: 1,
                category_name: 'Supper',
            },
        },
    };
    return shallow(<EditCategory {...props} />);
};

describe('Test Edit category component edits a category', () => {
    const event = {
        target: {
            category_name: '',
        },
        preventDefault: () => {},
    };

    const params = {
        category_id: 1,
        category_name: 'breakfast',
    };

    const wrapper = setUp('lunch', 1);
    it('has category name field', () => {
        const input = wrapper.find('input').at(0);
        expect(input.props().name).toEqual('category_name');
        expect(input.props().required).toEqual(true);
    });

    it('input should respond to change event and change the state', () => {
        wrapper
            .find('#category-name')
            .simulate('change', {
                target: { name: 'category_name', value: 'lunch' },
            });
        expect(wrapper.state('category_name')).toEqual('lunch');
    });

    it('submit button', () => {
        const input = wrapper.find('button').at(0);
        expect(input.props().type).toEqual('submit');
    });

    it('Form exists', () => {
        const input = wrapper.find('form').at(0);
        expect(input.props().name).toEqual('edit-category');
        expect(input.simulate('click'));
    });
});
