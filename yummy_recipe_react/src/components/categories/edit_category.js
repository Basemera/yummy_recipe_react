import React, { Component } from 'react';
import axios from 'axios';
import {notify} from 'react-notify-toast';
import toastr from 'toastr';
import {Redirect, Link} from 'react-router-dom';
import { deleteCategory, getCategories, editCategory } from '../../api_wrapper/categories';

class EditCategory extends Component{
    constructor(props){
    super(props);
    this.state= {
        'category_name':this.props.match.params.category_name,
        'successfuledit':false
    }
    }
    handleInputChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value})
        
      }
      onClick = event => {
        event.preventDefault();
        const {category_name} = this.state;
        // createCategory(category_name)
        const category_id = this.props.match.params.category_id;
        axios.put(`http://127.0.0.1:5000/category/${category_id}`, 
        {category_name:this.state.category_name},
        {headers:{'x-access-token':localStorage.getItem('token')}})
        // editCategory(category_id, {category_name:this.state.category_name}
        // )
        .then((response) => {
          console.log(response.data);
          toastr.success(response.data.message)
        //   this.props.getCats();
          this.props.history.push('/view-categories')
          this.setState({ successfuledit: true})
        })
        .catch((error) => {
          console.log(error.response);
          toastr.error(error.response.data.message)
          
        });
    }
     
    render(){
        const {category_name} = this.state
            return(
            <div>
      <div className = "container">
        <div className = "row">
        <div className = 'jumbotron'>
          
    <p> Add category</p>
    
            <form className="editcategory-form" onSubmit={this.onClick} name="edit-category">
    
                    <div className="form-group" >
                    <label className="control-label col-sm-4" for="add-category">Category Name:</label>
                    <input className="category-info" name="category_name" value = {this.state.category_name} onChange = {this.handleInputChange}/>
                    </div>
          <div className="form-group"> 
                  <div className="col-sm-offset-5 col-sm-5">
                  <button type="submit" className="btn btn-success">Edit</button> <Link to="/view-categories" className="btn btn-success">Cancel</Link>
          </div>
          </div>
    
        
      </form>
        </div>
    
    </div>
    </div>
    
            </div>);
    }    
    
};

export default EditCategory;