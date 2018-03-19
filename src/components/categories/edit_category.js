import React, { Component } from 'react';
import toastr from 'toastr';
import { Link } from 'react-router-dom';
import { editCategory } from '../../api_wrapper/categories';

/**
 * Component to edit categories*.
 */
class EditCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category_name: this.props.match.params.category_name,
            successfuledit: false,
        };
    }

    onClick = (event) => {
        event.preventDefault();
        const category_id = this.props.match.params.category_id;
        editCategory(category_id, { category_name: this.state.category_name })
            .then((response) => {
                this.setState({ successfuledit: true });
                toastr.success(response.data.message);
                this.props.history.push('/view-categories');
            })
            .catch((error) => {
                toastr.error(error.response.data.message);
            });
    };

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="jumbotron">
                            <p> Edit category</p>

                            <form
                                className="editcategory-form"
                                onSubmit={this.onClick}
                                id="#editcategory"
                                name="edit-category"
                            >
                                <div className="form-group">
                                    <label
                                        className="control-label col-sm-4 label-edit"
                                        htmlFor="add-category"
                                    >
                                        Category Name:
                                    </label>
                                    <input
                                        id="category-name"
                                        className="category-info"
                                        required
                                        name="category_name"
                                        value={this.state.category_name}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                                <div className="form-group editing">
                                    {/* <div className="col-sm-offset-5 col-sm-5"> */}
                                    <button
                                        type="submit"
                                        className="btn btn-success"
                                    >
                                        Edit
                                    </button>
                                    <Link
                                        to="/view-categories"
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

export default EditCategory;
