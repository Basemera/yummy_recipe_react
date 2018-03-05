import React, { Component } from 'react';
import axios from 'axios';
import {notify} from 'react-notify-toast';
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
      console.log(response.data);
      this.props.getCats();
      this.props.history.push('/view-category')
      this.setState({ categoryaddedSuccess: true})
    })
    .catch((error) => {
      console.log(error.response);
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
            <input type="text"  value = {this.state.category_name} onChange = {this.handleInputChange} className="form-control mb-2 mr-sm-2" placeholder="Category name"></input>
            <button type="submit" class="btn btn-primary mb-2 pxy-4">Save</button>
    </form>
    </div>

        {/* <form className="form-group addcategory-form" onSubmit={this.onClick} name="add-category">

                <div className="form-group" >
                <label className="control-label col-sm-4" for="add-category">Category Name:</label>
                <input className="form-group" name="category_name" value = {this.state.category_name} placeholder='Basemera' onChange = {this.handleInputChange}/>
                </div>
      <div className="form-group"> 
              <div className="col-sm-offset-5 col-sm-5">
              <button type="submit" className="btn btn-success">Add</button>
      </div>
      </div>

    
  </form> */}
    </div>

</div>
</div>

        </div>);

    }
  }
export default AddCategory;
