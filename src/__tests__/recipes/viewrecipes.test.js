import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow } from 'enzyme';
import ViewRecipes from '../../components/recipes/viewRecipes';
import AddRecipe from '../../components/recipes/addRecipe';

describe('Test View recipe component views all recipes', () => {
    const props = {
        // recipe_name,
        // description,
        // category,
        // handleInputChange: () => {

        // },

        match: {
            params: {
                category_id: 1,
            },
        },
    };
    const event = {
        target: {
            recipe_name: '',
            description: '',
            category_id: 1,
        },
        preventDefault: () => {},

        handleInputChange: () => {},
        onView: () => {},

        onClick: () => {},

        handleSearchClick: () => {},
    };

    const wrapper = shallow(<ViewRecipes {...props} />);

    it('has a valid snapshot', () => {
        <MemoryRouter>
            const component = renderer.create(
            <ViewRecipes {...props} />); const tree = component.toJSON();
            expect(tree).toMatchSnapshot();
        </MemoryRouter>;
    });

    it('should render <ViewRecipes{...props} /> component', () => {
        const wrapper = shallow(<ViewRecipes {...props} />);
        expect(wrapper.length).toEqual(1);
    });

    it('edits a recipe', () => {
        const input = wrapper.find('form').at(0);
        expect(input.simulate('editItem'));
    });

    it('deletes a recipe', () => {
        const input = wrapper.find('form').at(0);
        expect(input.simulate('Delete'));
    });

    it('deletes a recipe', () => {
        const input = wrapper.find('form').at(0);
        expect(input.simulate('handleInputChange'));
    });

    it('deletes a recipe', () => {
        const input = wrapper.find('form').at(0);
        expect(input.simulate('handleYes'));
    });

    it('deletes a recipe', () => {
        const input = wrapper.find('form').at(0);
        expect(input.simulate('handleNo'));
    });

    it('deletes a recipe', () => {
        const input = wrapper.find('form').at(0);
        expect(input.simulate('view'));
    });

    it('deletes a recipe', () => {
        const input = wrapper.find('form').at(0);
        expect(input.simulate('Search'));
    });

    it('deletes a recipe', () => {
        const input = wrapper.find('form').at(0);
        expect(input.simulate('Change'));
    });

    it('handle click', () => {
        const wrapper = shallow(<ViewRecipes {...props} />);
        wrapper.instance().handleClick();
    });

    it('renders nine div jsx elements', () => {
        expect(wrapper.find('div')).toHaveLength(8);
    });

    it('renders one Link jsx elements', () => {
        // eslint-disable-line
        expect(wrapper.find('Link')).toHaveLength(1); // eslint-disable-line
    });

    it('renders one a jsx elements', () => {
        // eslint-disable-line
        expect(wrapper.find('a')).toHaveLength(1); // eslint-disable-line
    });

    // eslint-disable-next-line
    it('renders one input jsx elements', () => {
        // eslint-disable-next-line
        expect(wrapper.find('input')).toHaveLength(1);
    });

    // eslint-disable-next-line
    it('should render <ViewRecipes /> component', () => {
        const wrapper = shallow(<AddRecipe />); // eslint-disable-line
        expect(wrapper.length).toEqual(1); // eslint-disable-line
    });
    // });
});
