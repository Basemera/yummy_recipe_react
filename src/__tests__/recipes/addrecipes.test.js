import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount } from 'enzyme';
import AddRecipe from '../../components/recipes/addRecipe'

const setUp = (recipe_name, description, category) => {
    const props = {
        recipe_name,
        description,
        category,
        handleInputChange: () => {
    
        },
        onClick: () => {
    
        },
    };
    return shallow(<AddRecipe {...props}/>)
    }

    describe("Test Add recipe component adds recipes to a category", () => {
        const event={
            target:{
                recipe_name:"",
                description:"",
                category:""
            },
            preventDefault: () => {
    
            },

            handleInputChange: () => {

            }
        }

        const wrapper = setUp('duck', 'this is', 1)
    it('has recipe name field', () => {
        const input = wrapper.find('input').at(0);
        wrapper.find('#recipe_name').simulate('change', { target: { name: 'recipe_name', value: 'duck' } });
        expect(input.props().name).toEqual('recipe_name');
        expect(input.props().required).toEqual(true);
        expect(wrapper.state('recipe_name')).toEqual('duck')
    })

    it('has description field', () => {
        const input = wrapper.find('input').at(1);
        wrapper.find('#description').simulate('change', { target: { name: 'description', value: 'this is' } });
        expect(input.props().name).toEqual('description');
        expect(input.props().required).toEqual(true);
        expect(wrapper.state('description')).toEqual('this is');
    })

    it('submit button', () => {
        const input = wrapper.find('button').at(0);
        expect(input.props().type).toEqual('submit');
      });
    
      it('Form exists', () => {
        const input = wrapper.find('form').at(0);
        expect(input.props().name).toEqual('add-category');
        expect(input.simulate('click'));
    
    }) ;

    it('handles submit', () => {
        const wrapper = mount(<AddRecipe />); 
        wrapper.instance().onClick(event)
    });

    it('Handles input change', () => {
        const input = wrapper.find('form').at(0);
        expect(input.simulate('handleInputChange'));
    });

    it('Handles input change', () => {
        const input = wrapper.find('form').at(0);
        expect(input.simulate('click'));
    });

    });