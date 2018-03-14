import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer'
import toJson from 'enzyme-to-json';
import '../../setupTests';
import EditRecipe from '../../components/recipes/edit_recipes'

const setUp = (recipe_name, description, category) => {
    const props = {
        recipe_name,
        description,
        category,
        handleInputChange: () => {
    
        },
        onClick: () => {
    
        },
        match:{
            params:{
                reipe_id:1,
                recipe_name:'Supper',
                description:"This is it",
                category:1
            }
        }
    };
    return shallow(<EditRecipe {...props}/>)
    }

    describe("Test Edit recipe component edits recipes", () => {
        const event={
            target:{
                recipe_name:"",
                description:"",
                category:""
            },
            preventDefault: () => {
    
            },

            handleInputChange: () => {

            },

            handleSubmit: () => {

            }
        }

        const wrapper = setUp('duck', 'this is', 1)

        // it('has a valid snapshot', () => {
        //     const component = renderer.create(
        //     <EditRecipe />);
        //     const tree = component.toJSON();
        //     expect(tree).toMatchSnapshot();
        // });
    it('has recipe name field', () => {
        const input = wrapper.find('input').at(0);
        wrapper.find('#recipe-name').simulate('change', { target: { name: 'recipe-name', value: 'duck' } });
        expect(input.props().name).toEqual('recipe_name');
        expect(input.props().required).toEqual(true);
        expect(wrapper.state('recipe-name')).toEqual('duck')
    });

    it('has description field', () => {
        const input = wrapper.find('input').at(1);
        wrapper.find('#description').simulate('change', { target: { name: 'description', value: 'this is' } });
        expect(input.props().name).toEqual('description');
        expect(input.props().required).toEqual(true);
        expect(wrapper.state('description')).toEqual('this is');
    });

    it('submit button', () => {
        const input = wrapper.find('button').at(0);
        expect(input.props().type).toEqual('submit');
      });
    
      it('Form exists', () => {
        const input = wrapper.find('form').at(0);
        expect(input.props().name).toEqual('edit-recipe');
        expect(input.simulate('click'));
    }) ;

    it('renders the edit recipe form and submits data', () =>{
        wrapper.setState({recipe_name:'apples', description:'this is me'});
        wrapper.find("#editrecipe").simulate('submit', {preventDefault(){}});
        expect(toJson(wrapper)).toMatchSnapshot();
        // expect(handleSubmit.calledOnce).toEqual(false)
    });
});