import React, { Component } from 'react';
import toastr from 'toastr';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import AddCategory from './addCategory';
import {
    deleteCategory,
    getCategories,
    searchCategories,
    categoriesSearchChangePage,
    searchClickCategories,
} from '../../api_wrapper/categories';
import { getToken } from '../../utils/authservice';

const CategoryToRender = props => (
    <div className="col-md-6 col-lg-3 category-card">
        {/* <div className="card mb-3"> */}
        <div className="card card-width">
            <div className="card-header text-center">{props.category_name}</div>
            <div className="card-block">
                <div className="card-body">
                    <button
                        className="btn btn-primary"
                        onClick={() =>
                            props.OneditItem(props.category_id, props.category_name)
                        }
                    >
                        Edit
                        <i className="fa fa-edit" />
                    </button>
                    <button
                        className="btn btn-danger"
                        onClick={() =>
                            props.onDelete(props.category_id, props.category_name)
                        }
                        data-id={props.category_id}
                    >
                        Delete
                        <i className="fa fa-trash" />
                    </button>
                </div>
                <h5>
                    <Link to="#" onClick={() => props.onView(props.category_id)}>
                        Recipes
                    </Link>
                </h5>
            </div>
        </div>
    </div>
);

/**
 * Component to view categories*.
 */
class ViewCategories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            category_name: '',
            category_id: '',
            total: '',
            currentPage: '',
            search: false,
        };
    }

    componentDidMount() {
        this.onClick();
    }

    onView = (category_id) => {
        this.props.history.push(`/view-recipes/${category_id}`);
    };

    onDelete = (category_id, category_name) => {
        confirmAlert({
            title: 'Confirm to delete',
            message: `Are you sure you want to delete  ${category_name}`,
            confirmLabel: 'Delete',
            cancelLabel: 'Cancel',
            onConfirm: () => this.handleYes(category_id),
            onCancel: () => this.handleNo(),
        });
    };

    onSearch = (event) => {
        event.preventDefault();
        const category_name = event.target.category_name.value;
        this.setState({ category_name });
        searchCategories(category_name)
            .then((response) => {
                toastr.success('Search item found');
                this.setState({
                    categories: response.data.results,
                    total: response.data.count,
                    currentPage: response.data.pagenumber,
                    itemsPerPage: response.data.per_page,
                    category_name,
                    search: true,
                });
            })
            .catch((error) => {
                toastr.error(error.response.data.message);
            });
    };

    onClick = () => {
        // this.setState({ category_name: "" })
        getCategories()
            .then((response) => {
                this.setState({
                    categories: response.data.results,
                    total: response.data.count,
                    currentPage: response.data.pagenumber,
                    itemsPerPage: 8,
                    search: false,
                });
            })

            .catch((error) => {
                if (getToken === '') {
                    this.props.history.push('/login');
                }
            });
    };

    handleYes = (category_id) => {
        deleteCategory(category_id)
            .then((response) => {
                toastr.success(response.data.message);
                this.setState({ successfuldelete: true });
                this.props.history.push('/view-categories');
                this.onClick();
            })
            .catch((error) => {
                toastr.error(error.response.data.message);
            });
    };

    handleNo = () => {
        this.props.history.push('/view-categories');
    };

    OneditItem = (category_id, category_name) => {
        this.props.history.push(`/edit-category/${category_id}/${category_name}`);
    };

    pageChangeHandler = () => {
        this.props.onPaginate();
    };

    handleClick(number) {
        categoriesSearchChangePage(number)
            .then((response) => {
                this.setState({
                    categories: response.data.results,
                    total: response.data.count,
                    currentPage: response.data.pagenumber,
                    itemsPerPage: 8,
                });
            })

            .catch((error) => {
                this.props.history.push('/login');
            });
    }

    handleSearchClick = (event, pages) => {
        event.preventDefault();
        const category_name = this.state.category_name;
        searchClickCategories(category_name, pages).then((response) => {
            this.setState({
                categories: response.data.results,
                search: true,
                currentPage: response.data.pagenumber,
                itemsPerPage: 8,
            });
        });
    };

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    render() {
        const categoryitems = this.state.categories.map(categories => (
            <CategoryToRender
                onView={this.onView}
                onDelete={this.onDelete}
                OneditItem={this.OneditItem}
                category_name={categories.category_name}
                category_id={categories.category_id}
                key={categories.category_id}
            />
        ));

        const { total, search } = this.state;
        let loadPagination;
        const pageNumbers = [];
        if (total > 8) {
            for (let i = 1; i <= Math.ceil(total / 8); i++) {
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
            <div>
                <div className="view-categories-head">
                    <h4 className="categories-header-cat"> Categories </h4>
                    <div className="container">
                        <div className="row">
                            <div className="col-6 search-form">
                                <form
                                    className="search-form"
                                    onSubmit={this.onSearch}
                                    name="search-category"
                                >
                                    <input
                                        className="search-form"
                                        required
                                        id="category-name"
                                        type="text"
                                        name="category_name"
                                        value={this.state.category_name}
                                        onChange={this.handleInputChange}
                                        className="form-control mb-2 mr-sm-2"
                                        placeholder="Category name"
                                    />
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        Search
                                    </button>
                                </form>
                            </div>

                            <div className=" mb-2 mr-sm-2 add-category">
                                <AddCategory getCats={this.onClick} />
                            </div>

                            <div className="view-categories">
                                <div className="view-categories-title center">
                                    <p>
                                        <Link
                                            to="/view-categories"
                                            onClick={this.onClick}
                                        >
                                            View all categories
                                        </Link>
                                    </p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="view-categories">
                                    <div className="this">
                                        {this.state.categories.length ? (
                                            categoryitems
                                        ) : (
                                            <div
                                                className="col-sm-2 offset-sm-5"
                                                className="no-categories"
                                            >
                                                <div
                                                    className="alert alert-info"
                                                    role="alert"
                                                >
                                                    <strong>Ooops!</strong> There are
                                                    no categories to display. Please
                                                    add some.
                                                </div>
                                            </div>
                                        )}
                                        <div className="text-center">
                                            <ul className="pagination">
                                                {loadPagination}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default ViewCategories;
