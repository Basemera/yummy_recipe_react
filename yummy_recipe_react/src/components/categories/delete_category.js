import React, { Component } from 'react';
import axios from 'axios';
import toastr from 'toastr';
import { notify } from 'react-notify-toast';
import { Redirect } from 'react-router-dom';
import {deleteCategory} from '../../api_wrapper/categories'

/**
 * Component to delete categories*.
 */
class DeleteCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'category_id': this.props.match.params.category_id,
            'successfuldelete': false
        }

    };
    handleYes = (event) => {
        event.preventDefault();
        const category_id = this.props.match.params.category_id;
        deleteCategory({category_id})
            .then((response) => {
                toastr.success(response.data.message)
                this.setState({ successfuldelete: true })
                this.props.history.push('/view-categories')
            })
            .catch((error) => {
                console.log(error.response);
            });
    }
    handleNo = event => {
        event.preventDefault();
        const { category_name } = this.state;
        // createCategory(category_name)
        const category_id = this.props.match.params.category_id;
        this.props.history.push('/view-categories')
    }

    render() {
        return (
            <div>
                <div>
                </div>
                <div id="myModal" className="modal hide delete-modal">
                    <div className="modal-header">
                        <a href="#" data-dismiss="modal" aria-hidden="true" className="close">×</a>
                        <h3>Delete    </h3>
                    </div>
                    <div className="modal-footer">
                        <button onClick={this.handleYes}>Yes</button>
                        <button onClick={this.handleNo}>No</button>
                    </div>
                    {/* <button onClick = {() => this.onDelete(categories.category_id)}>Delete</button> */}

                </div>
            </div>
        );
    }

}
export default DeleteCategory;