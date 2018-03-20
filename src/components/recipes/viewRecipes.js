import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import toastr from 'toastr';
import AddRecipe from './addRecipe';
import {
    deleteRecipes,
    getRecipes,
    searchRecipes,
    recipesSearchChangePage,
    searchClickRecipes,
} from '../../api_wrapper/recipes';

/**
 * Component to view recipes*.
 */
class ViewRecipes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
            recipe_id: '',
            category_id: this.props.match.params.category_id,
            recipe_name: '',
            description: '',
            total: '',
            currentPage: '',
            itemsPerPage: '',
            search: false,
        };
    }

    componentDidMount() {
        this.onClick();
    }

    onSearch = (event) => {
        event.preventDefault();
        const recipe_name = event.target.recipe_name.value;
        this.setState({ recipe_name });
        const category = this.state.category_id;
        searchRecipes(recipe_name, category)
            .then((response) => {
                toastr.success('Search item found');
                this.setState({
                    recipes: response.data.results,
                    total: response.data.count,
                    itemsPerPage: response.data.per_page,
                    search: true,
                });
            })
            .catch((error) => {
                toastr.error(error.response.data.message);
                this.onClick();
            });
    };

    onClick = () => {
        const category = this.props.match.params.category_id;
        getRecipes(category)
            .then((response) => {
                this.setState({
                    recipes: response.data.results,
                    recipe_name: '',
                    description: '',
                    total: response.data.count,
                });
            })

            .catch((error) => {
                this.props.history.push('/login');
                toastr.error(error.response.message);
            });
    };

    onSignout = () => {
        const AUTH_TOKEN_KEY = 'token';
        const clearToken = () => localStorage.removeItem(AUTH_TOKEN_KEY);
        clearToken();
        this.props.history.push('/');
    };

    onDelete = (recipe_id, recipe_name, category) => {
        confirmAlert({
            title: 'Confirm to delete',
            message: `Are you sure you want to delete ${recipe_name}`,
            confirmLabel: 'Delete',
            cancelLabel: 'Cancel',
            onConfirm: () => this.handleYes(recipe_id, category),
            onCancel: () => this.handleNo(category),
        });
    };

    onView = () => {
        this.props.history.push('/view-categories');
    };

    handleNo = (category) => {
        this.onClick();
    };

    handleClick(number) {
        const category = this.props.match.params.category_id;
        recipesSearchChangePage(number, category).then((response) => {
            this.setState({
                recipes: response.data.results,
                currentPage: response.data.pagenumber,
                itemsPerPage: 6,
            });
        });
    }

    handleSearchClick = (event, pages) => {
        event.preventDefault();
        const category = this.props.match.params.category_id;
        const recipe_name = this.state.recipe_name;
        searchClickRecipes(recipe_name, pages, category).then((response) => {
            this.setState({
                recipes: response.data.results,
                currentPage: response.data.pagenumber,
                itemsPerPage: 6,
            });
        });
    };

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    OneditItem = (recipe_id, category, recipe_name, description) => {
        this.props.history.push(`/edit-recipe/${category}/${recipe_id}/${recipe_name}/${description}`);
    };

    handleYes = (recipe_id, category) => {
        const category2 = this.props.match.params.category_id;
        deleteRecipes(category2, recipe_id)
            .then((response) => {
                toastr.success(response.data.message);
                this.setState({ successfuldelete: true });
                this.onClick();
            })
            .catch((error) => {
                toastr.error(error.response);
            });
    };

    render() {
        const recipeitems = this.state.recipes.map(recipes => (
            <div className="col-md-4 col-lg-4 recipe-card">
                <li className="unstyled">
                    <div id="${recipes.recipe_id}">
                        <div className="panel">
                            <div className="card">
                                <div className="card-header" id="#accordion">
                                    <h5 className="mb-0">
                                        <button
                                            className="btn btn-link"
                                            data-toggle="collapse"
                                            aria-labelledby="${recipes.recipe_id}"
                                            data-target={`#${
                                                recipes.recipe_id
                                            }`}
                                            aria-expanded="false"
                                            aria-controls="${recipes.recipe_name}"
                                        >
                                            {recipes.recipe_name}
                                        </button>
                                    </h5>
                                </div>

                                <div
                                    id={recipes.recipe_id}
                                    className="collapse"
                                    data-parent="accordion"
                                >
                                    <p className="test">
                                        {recipes.description}
                                    </p>
                                    <Link
                                        id="recipe-link"
                                        to="#"
                                        onClick={() =>
                                            this.OneditItem(
                                                recipes.recipe_id,
                                                recipes.category,
                                                recipes.recipe_name,
                                                recipes.description,
                                            )
                                        }
                                    >
                                        <i className="fa fa-edit" />
                                    </Link>
                                    <Link
                                        to="#"
                                        onClick={() =>
                                            this.onDelete(
                                                recipes.recipe_id,
                                                recipes.recipe_name,
                                                recipes.category,
                                            )
                                        }
                                        className="confirm-delete"
                                        data-id={recipes.recipe_id}
                                    >
                                        <i className="fa fa-trash" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </div>
        ));

        const { total, search } = this.state;
        let loadPagination;
        const pageNumbers = [];
        if (total > 6) {
            for (let i = 1; i <= Math.ceil(total / 6); i++) {
                pageNumbers.push(i);
            }
        } else {
            pageNumbers.push(1);
        }
        if (search === false) {
            loadPagination = pageNumbers.map(number => (
                <li
                    className="page-item"
                    key={number}
                    style={{ display: 'inline-block' }}
                >
                    <a
                        className="page-link"
                        onClick={() => this.handleClick(number)}
                        key={number}
                        id={number}
                    >
                        {number}
                    </a>
                </li>
            ));
        } else if (search === true) {
            loadPagination = pageNumbers.map(pages => (
                <li
                    className="page-item"
                    key={pages}
                    style={{ display: 'inline-block' }}
                >
                    <a
                        className="page-link"
                        onClick={event => this.handleSearchClick(event, pages)}
                        key={pages}
                        id={pages}
                    >
                        {pages}
                    </a>
                </li>
            ));
        }

        return (
            <div className="recipes-view">
                <div className="recipes-view">
                    <div className="container">
                        {/* <div className="row"> */}

                        <p className="categories-header header">
                            <Link to="#" onClick={() => this.onView()}>
                                {this.state.category_name} Back to categories
                            </Link>
                        </p>
                        <div className="col-6 search-form">
                            <form
                                className="search-form-recipes"
                                onSubmit={this.onSearch}
                                name="search-recipes"
                            >
                                <input
                                    className="search-form"
                                    type="text"
                                    name="recipe_name"
                                    value={this.state.recipe_name}
                                    onChange={this.handleInputChange}
                                    className="form-control mb-2 mr-sm-2"
                                    placeholder="recipe name"
                                />
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Search
                                </button>
                            </form>
                        </div>
                        <AddRecipe
                            getRecipes={this.onClick}
                            category_id={this.state.category_id}
                        />

                        <div className="row recipes">
                            {this.state.recipes.length ? (
                                recipeitems
                            ) : (
                                <div
                                    className="col-sm-4 col-lg-4"
                                    className="no-categories"
                                >
                                    <div
                                        className="alert alert-info"
                                        role="alert"
                                    >
                                        <strong>Ooops!</strong> There are no
                                        recipes to display. Please add some.
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="text-center">
                    <ul className="pagination">{loadPagination}</ul>
                </div>
            </div>
        );
    }
}
export default ViewRecipes;
