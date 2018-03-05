import React, { Component } from 'react';
import axios from 'axios';
import {notify} from 'react-notify-toast';
import toastr from 'toastr';
import {Redirect} from 'react-router-dom';
import {createCategory} from '../../api_wrapper/categories'

class AddCategory extends Component{
  constructor(props) {
    super(props);
    this.state={
        category_name: '',
      categoryaddedSuccess: false,
      };
  }
    

  handleInputChange = (event) => {
      const {name, value} = event.target;
      this.setState({[name]: value})
      
    }
  
  onClick = event => {
    event.preventDefault();
    const {category_name} = this.state;
    createCategory(category_name)
    // axios.post('http://127.0.0.1:5000/category', {category_name, 
    // headers:{'x-access-token':localStorage.getItem('token')}})
    axios.post('http://127.0.0.1:5000/category', 
    {category_name:this.state.category_name},
    {headers:{'x-access-token':localStorage.getItem('token')}})
    .then((response) => {
      console.log(response.data.message);
      toastr.success(response.data.message)
      this.props.getCats();
      this.props.history.push('/view-category')
      this.setState({ categoryaddedSuccess: true})
      
    })
    .catch((error) => {
      toastr.error(error.response.data.message)
    });
    this.setState({
        category_name: '',
        categoryaddedSuccess: false,
      });
  }
  render(){
    const {category_name} = this.state
        return(
        <div>
  <div className = "container">
    <div className = "row">
    <div className = 'jumbotron addcategory-form'>
      
<p> Add category</p>

<div class="row justify-content-center">
        <form className="form-inline" onSubmit={this.onClick} name="add-category">
            <input type="text"  name="category_name" value = {this.state.category_name} onChange = {this.handleInputChange} className="form-control mb-2 mr-sm-2" placeholder="Category name"></input>
            <button type="submit" className="btn btn-primary mb-2 pxy-4">Save</button>
    </form>
    </div>
    </div>

</div>
</div>

        </div>);

    }
  }
export default AddCategory;
