import React, { Component } from 'react';
import axios from 'axios';
import { notify } from 'react-notify-toast';
import toastr from 'toastr';
import { Redirect } from 'react-router-dom';
import { editRecipes } from '../../api_wrapper/recipes';

class EditRecipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'recipe_name': this.props.match.params.recipe_name,
            'recipe_id': this.props.match.params.recipe_id,
            'successfuledit': false,
            'description': this.props.match.params.description,
        }
    }
    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value })

    }
    onClick = event => {
        event.preventDefault();
        const { recipe_name, description } = this.state;
        const category = this.props.match.params.category;
        const recipe_id = this.props.match.params.recipe_id;
            editRecipes(category, recipe_id, {recipe_name:this.state.recipe_name, description:this.state.description}
            )
            .then((response) => {
                console.log(category);
                this.props.history.push(`/view-recipes/${category}`)
                this.setState({ successfuledit: true })
                toastr.success(response.data.message)
            })
            .catch((error) => {
                toastr.error(error.response.data.message)
                console.log(error.response.data.message);
            });
    }

    render() {
        const { recipe_name, recipe_id, description, category } = this.state
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className='jumbotron'>

                            <p> Edit Recipe</p>

                            <form className="form-inline" onSubmit={this.onClick} name="add-category">

                                <div className="form-group" >
                                    {/* <label className="control-label col-sm-4" >Name:</label> */}
                                    <input className="form-group" name="recipe_name" value={this.state.recipe_name} required="True"  placeholder="recipe name" onChange={this.handleInputChange} />
                                </div>
                                <div>
                                    {/* <label className="control-label col-sm-4" >Description:  </label> */}
                                    <input className="form-group" name="description" value={this.state.description} required="True" placeholder="description" onChange={this.handleInputChange} />
                                </div>

                                <div className="col-sm-offset-5 col-sm-5">
                                    <button type="submit" className="btn btn-success">Edit</button>
                                </div>


                            </form>
                        </div>

                    </div>
                </div>

            </div>);
    }

};

export default EditRecipe;