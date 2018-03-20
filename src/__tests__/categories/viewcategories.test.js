import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { ViewCategories, CategoryToRender } from '../../components/categories/viewCategories';
import AddCategory from '../../components/categories/addCategory';


const setUp = (category_name, category_id) => {
    const props = {
        category_name,
        handleInputChange: () => {},
        onClick: () => {},

        onPaginate: () => {},

        OneditItem: () => {},

        onView: () => {},

        onDelete: () => {},

        onSearch: () => {},

        handleClick: () => {},

        handleSearchClick: () => {},

        handleYes: () => {},

        handleNo: () => {},

        pageChangeHandler: () => {},

        match: {
            params: {
                category_id: 1,
                category_name: 'Supper',
            },
        },
    };
    return shallow(<ViewCategories {...props} />);
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

    it('has a valid snapshot', () => {
        <MemoryRouter>
            const component = renderer.create(
            <ViewCategories />); const tree = component.toJSON();
            expect(tree).toMatchSnapshot();
        </MemoryRouter>;
    });

    it('renders view categories component', () => {
        const wrapper = mount(<MemoryRouter initialEntries={['/view-categories']}>
            <Route
                exact
                path="/view-categories"
                render={() => <ViewCategories dispatch={() => {}} />}
            />
        </MemoryRouter>);
        expect(wrapper.find(ViewCategories)).toHaveLength(1);
    });

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
        expect(input.props().name).toEqual('search-category');
        expect(input.simulate('click'));
    });

    it('should render <ViewCategories /> component', () => {
        const wrapper = shallow(<AddCategory />);
        expect(wrapper.length).toEqual(1);
    });

    it('edits a category', () => {
        const input = wrapper.find('form').at(0);
        expect(input.simulate('edit'));
    });

    it('views a categories', () => {
        const input = wrapper.find('form').at(0);
        expect(input.simulate('view'));
    });

    it('deletes a category', () => {
        const input = wrapper.find('form').at(0);
        expect(input.simulate('delete'));
    });

    it('searches for categories', () => {
        const input = wrapper.find('form').at(0);
        expect(input.simulate('Search'));
    });

    it('Paginates categories', () => {
        const input = wrapper.find('form').at(0);
        expect(input.simulate('Paginate'));
    });

    it('changes page numnbers on click for categories', () => {
        const input = wrapper.find('form').at(0);
        expect(input.simulate('handleClick'));
    });

    it('changes page numnbers on click for search', () => {
        const input = wrapper.find('form').at(0);
        expect(input.simulate('handleSearchClick'));
    });

    it('changes page numnbers on click for search', () => {
        const input = wrapper.find('form').at(0);
        expect(input.simulate('handleInputChange'));
    });

    it('changes page numnbers on click for search', () => {
        const input = wrapper.find('form').at(0);
        expect(input.simulate('handleYes'));
    });

    it('changes page numnbers on click for search', () => {
        const input = wrapper.find('form').at(0);
        expect(input.simulate('handleNo'));
    });

    it('changes page numnbers on click for search', () => {
        const input = wrapper.find('form').at(0);
        expect(input.simulate('pageChangeHandler'));
    });

    it('should render <ViewCategories /> component', () => {
        const wrapper = shallow(<CategoryToRender />);
        expect(wrapper.length).toEqual(1);
    });
});
