import React from 'react';
import {MemoryRouter, Route} from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer'
import sinon from 'sinon'
import ViewRecipes from '../../components/recipes/view_recipes'
import AddRecipes from '../../components/recipes/add_recipes'

// const setUp = (recipe_name, description, category) => {
//     const props = {
//         recipe_name,
//         description,
//         category,
//         handleInputChange: () => {
    
//         },
//         onClick: () => {
    
//         },

//         match: {
//             params:{
//                 category_id:1
//             }
            
//         }
//     };
//     return shallow(<ViewRecipes {...props}/>)
//     }
    describe("Test View recipe component views all recipes", () => {
        const props = {
                    // recipe_name,
                    // description,
                    // category,
                    // handleInputChange: () => {
                
                    // },
                    
            
                    match: {
                        params:{
                            category_id:1
                        }
                        
                    }
                };
        const event={
            target:{
                recipe_name:"",
                description:"",
                category_id:1
            },
            preventDefault: () => {
    
            },

            handleInputChange: () => {

            },
            onView: () => {

            },

            onClick: () => {
                
            },

            handleSearchClick: () => {
                
            },
        };

        const wrapper = shallow( <ViewRecipes {...props}/> );

        it('has a valid snapshot', () => {
            <MemoryRouter>
            const component = renderer.create(
            <ViewRecipes {...props}/>);
            const tree = component.toJSON();
            expect(tree).toMatchSnapshot();
            </MemoryRouter>
        });

        it('should render <ViewRecipes{...props} /> component', () => {
            const wrapper = shallow(<ViewRecipes {...props}/>)
            expect(wrapper.length).toEqual(1)
        });

        // it('Link exists', () => {
        //     const input = wrapper.find('#recipe-link').at(1);
        //     console.log(input)
        //     expect(input.props().name).toEqual('recipe-link');
        //     expect(input.simulate('editItem'));
        // }) ; 

        it('edits a recipe', () => {
            const input = wrapper.find('form').at(0);
            expect(input.simulate('editItem'));
        }) ; 

        it('deletes a recipe', () => {
            const input = wrapper.find('form').at(0);
            expect(input.simulate('Delete'));
        }) ; 

        it('deletes a recipe', () => {
            const input = wrapper.find('form').at(0);
            expect(input.simulate('handleInputChange'));
        }) ;

        it('deletes a recipe', () => {
            const input = wrapper.find('form').at(0);
            expect(input.simulate('handleYes'));
        }) ;

        it('deletes a recipe', () => {
            const input = wrapper.find('form').at(0);
            expect(input.simulate('handleNo'));
        }) ;
        
        it('deletes a recipe', () => {
            const input = wrapper.find('form').at(0);
            expect(input.simulate('view'));
        }) ;

        it('deletes a recipe', () => {
            const input = wrapper.find('form').at(0);
            expect(input.simulate('Search'));
        }) ;

        it('deletes a recipe', () => {
            const input = wrapper.find('form').at(0);
            expect(input.simulate('Change'));
        }) ;

        it('handle click', () => {
            const wrapper = shallow(<ViewRecipes {...props}/>); 
            wrapper.instance().handleClick()
        });

        it('renders nine div jsx elements', () => {
            expect(wrapper.find("div")).toHaveLength(14);
        });

        it('renders one Link jsx elements', () => {
            expect(wrapper.find("Link")).toHaveLength(1);
        });

        it('renders one a jsx elements', () => {
            expect(wrapper.find("a")).toHaveLength(3);
        });

        it('renders one input jsx elements', () => {
            expect(wrapper.find("input")).toHaveLength(1);
        });

        it('should render <ViewRecipes /> component', () => {
            const wrapper = shallow(<AddRecipes />)
            expect(wrapper.length).toEqual(1)
        });

        // it('handle click', () => {
        //     const wrapper = shallow(<ViewRecipes {...props}/>); 
        //     wrapper.instance().handleSearchClick()
        // });
    });