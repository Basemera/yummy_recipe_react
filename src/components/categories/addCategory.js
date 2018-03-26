import React, { Component } from 'react';
import axios from 'axios';
import { notify } from 'react-notify-toast';
import toastr from 'toastr';
import { Redirect } from 'react-router-dom';
import { createCategory } from '../../api_wrapper/categories';

/**
 * Component to add categories*.
 */
class AddCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category_name: '',
            categoryAddedSuccess: false,
        };
    }

    onClick = (event) => {
        event.preventDefault();
        const { category_name } = this.state;
        createCategory({ category_name })
            .then((response) => {
                this.setState({ categoryAddedSuccess: true });
                this.props.getCats();
                toastr.success(response.data.message);
                this.props.history.push('/view-categories');
            })
            .catch((error) => {
                if (error.response) {
                    const { data: { message } } = error.response;
                    toastr.error(message);
                }
            });
        this.setState({
            category_name: '',
            categoryAddedSuccess: false,
        });
    };

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    render() {
        const { category_name } = this.state;
        return (
            <div>
                <p> . </p>

                <div className="row justify-content-center">
                    <form
                        className="form-inline"
                        onSubmit={this.onClick}
                        name="add-category"
                    >
                        <input
                            type="text"
                            id="categoryName"
                            required
                            name="category_name"
                            value={this.state.category_name}
                            onChange={this.handleInputChange}
                            className="form-control mb-2 mr-sm-2"
                            placeholder="Category name"
                        />
                        <button
                            type="submit"
                            className="btn btn-primary mb-2 pxy-4"
                        >
                            Add
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}
export default AddCategory;
