import React, { Component } from 'react';
import toastr from 'toastr';
import { Link } from 'react-router-dom';
import { editRecipes } from '../../api_wrapper/recipes';

/**
 * Component to edit recipes*.
 */
class EditRecipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipe_name: this.props.match.params.recipeName,
            recipe_id: this.props.match.params.recipeId,
            successfuledit: false,
            description: this.props.match.params.description,
            category: this.props.match.params.category,
        };
    }

    onClick = (event) => {
        event.preventDefault();
        const category = this.props.match.params.category;
        const recipe_id = this.props.match.params.recipeId;
        const recipe_name = this.props.match.params.recipeName;
        const description = this.props.match.params.description;
        editRecipes(category, recipe_id, {
            recipe_name: this.state.recipe_name,
            description: this.state.description,
        })
            .then((response) => {
                this.props.history.push(`/view-recipes/${category}`);
                this.setState({ successfuledit: true });
                toastr.success(response.data.message);
            })
            .catch((error) => {
                toastr.error(error.response.data.message);
            });
    };

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    cancel = (category) => {
        this.props.history.push(`/view-recipes/${category}`);
    };

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="jumbotron">
                            {/* <p> Edit Recipe</p> */}

                            <form
                                id="editrecipe"
                                className="form-inline editcategory-form"
                                onSubmit={this.onClick}
                                name="edit-recipe"
                            >
                                <div className="form-group">
                                    <input
                                        className="form-group"
                                        id="recipe-name"
                                        name="recipe_name"
                                        value={this.state.recipe_name}
                                        required
                                        placeholder="recipe name"
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                                <div>
                                    <input
                                        className="form-group"
                                        id="description"
                                        name="description"
                                        value={this.state.description}
                                        required
                                        placeholder="description"
                                        onChange={this.handleInputChange}
                                    />
                                </div>

                                <div className="form-group editing">
                                    <button
                                        type="submit"
                                        className="btn btn-success"
                                    >
                                        Edit
                                    </button>
                                    <Link
                                        onClick={this.cancel}
                                        to="#"
                                        className="btn btn-success"
                                    >
                                        Cancel
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditRecipe;
