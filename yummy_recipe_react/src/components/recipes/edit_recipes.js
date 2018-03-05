import React, { Component } from 'react';
import axios from 'axios';
import {notify} from 'react-notify-toast';
import {Redirect} from 'react-router-dom';
import { editRecipes } from '../../api_wrapper/recipes';

class EditRecipe extends Component{
    constructor(props){
    super(props);
    this.state= {
        'recipe_name':this.props.match.params.recipe_name,
        'recipe_id':this.props.match.params.recipe_id,
        'successfuledit':false,
        'description':this.props.match.params.description,
    }
    }
    handleInputChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value})
        
      }
      onClick = event => {
        event.preventDefault();
        const {recipe_name, description} = this.state;
        // const category = this.props.match.params.category;
        const recipe_id = this.props.match.params.recipe_id;
        axios.put(`http://127.0.0.1:5000/category/recipes/${recipe_id}`, 
        {recipe_name:this.state.recipe_name, description:this.state.description},
        {headers: {'x-access-token':localStorage.getItem('token')}})
        // editRecipes(recipe_id, {recipe_name:this.state.recipe_name, description:this.state.description}
        // )
        .then((response) => {
          console.log(response.data);
          const category = this.props.match.params.category
          this.props.history.push(`/view-recipes/${category}`)
          this.setState({ successfuledit: true})
          notify.show(response.data.message, "success", '10000')
        })
        .catch((error) => {
            
            // notify.show(error.response, '4000')
          console.log(error.response);
        });
    }
     
    render(){
        const {recipe_name, recipe_id, description, category} = this.state
            return(
            <div>
      <div className = "container">
        <div className = "row">
        <div className = 'jumbotron'>
          
    <p> Edit Recipe</p>
    
            <form className="editcategory-form" onSubmit={this.onClick} name="edit-category">
    
                    <div className="form-group" >
                    <label className="control-label col-sm-4" for="add-recipe">Recipe name:</label>
                    <input className="category-info" name="recipe_name" value = {this.state.recipe_name} onChange = {this.handleInputChange}/>
                    </div>
                    <div className="form-group" >
                    <label className="control-label col-sm-4" for="add-recipe">description:</label>
                    <input className="category-info" name="description" value = {this.state.description} onChange = {this.handleInputChange}/>
                    </div>
          <div className="form-group"> 
                  <div className="col-sm-offset-5 col-sm-5">
                  <button type="submit" className="btn btn-success">Edit</button>
          </div>
          </div>
    
        
      </form>
        </div>
    
    </div>
    </div>
    
            </div>);
    }    
    
};

export default EditRecipe;