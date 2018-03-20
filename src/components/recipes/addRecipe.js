import React, { Component } from 'react';
import axios from 'axios';
import toastr from 'toastr';
import { notify } from 'react-notify-toast';
import { Redirect } from 'react-router-dom';
import { createRecipes } from '../../api_wrapper/recipes';

/**
 * Component to add recipes*.
 */
class AddRecipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipe_name: '',
            description: '',
            recipeAddedSuccess: false,
        };
    }

    onClick = (event) => {
        event.preventDefault();
        const { recipe_name, description } = this.state;
        const category = this.props.category_id;
        createRecipes(category, {
            recipe_name: this.state.recipe_name,
            description: this.state.description,
        })
            .then((response) => {
                toastr.success(response.data.message);
                this.props.getRecipes();

                this.setState({ recipeAddedSuccess: true });
            })

            .catch((error) => {
                if (error.response) {
                    const { data: { message } } = error.response;
                    toastr.error(message);
                }
            });

        this.setState({
            recipe_name: '',
            description: '',
            categoryaddedSuccess: false,
        });
    };

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    render() {
        const { recipe_name, description } = this.state;
        return (
            <div className="col-6 add-recipe">
               

                <form
                    className="form-inline"
                    onSubmit={this.onClick}
                    name="add-category"
                >
                    <input
                        type="text"
                        required
                        id="recipe_name"
                        name="recipe_name"
                        value={this.state.recipe_name}
                        required
                        placeholder="recipe name"
                        onChange={this.handleInputChange}
                        className="form-control mb-2 mr-sm-2"
                        placeholder="recipe name"
                    />
                    <input
                        type="text"
                        required
                        id="description"
                        name="description"
                        value={this.state.description}
                        required
                        placeholder="description"
                        onChange={this.handleInputChange}
                        className="form-control mb-2 mr-sm-2"
                    />
                    <button
                        type="submit"
                        className="btn btn-primary mb-2 pxy-4"
                    >
                        Add
                    </button>
                </form>
            </div>
        );
    }
}
export default AddRecipe;
