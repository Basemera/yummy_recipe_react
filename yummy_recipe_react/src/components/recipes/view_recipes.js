import React, { Component } from 'react';
import axios from 'axios';
import {notify} from 'react-notify-toast';
import {Redirect, Link} from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import AddRecipe from './add_recipes'
import EditRecipe from './edit_recipes';


class ViewRecipes extends Component{
        constructor(props){
            super(props);
            this.state={
                recipes: [],
                category: this.props.match.params.category_id,
                recipe_name:""
              };       
        }
        
        onSearch = (event) => {
            event.preventDefault();
            const recipe_name = event.target.recipe_name.value
            const category = this.state.category
            console.log('baron is that', recipe_name);
            axios.get(`http://127.0.0.1:5000/category/${category}/recipes/search?q=${recipe_name}&per_page=5&page=1`,
            {headers:{'x-access-token':localStorage.getItem('token')}})
            .then((response) => {
              console.log(response.data);
            this.setState({ 
             recipes:response.data,
             recipe_name:""
            //  search:event.target.category_name.value,
            });
              
            })
            .catch((error) => {
              console.log(error.response);
            });
          }

        componentDidMount(){
            this.onClick();
        }
          
        onClick = () => {
            const category = this.props.match.params.category_id

          axios.get(`http://127.0.0.1:5000/category/${category}/recipes`, {headers:{'x-access-token':localStorage.getItem('token')}})
          // getCategories()
          .then((response) => {
              this.setState({ recipes: response.data })
            //   this.componentDidMount()
            })
          
          .catch((error) => {
                console.log(error.response);
                this.props.history.push('/view-recipes')
              });
      
              
        }

        handleInputChange = (event) => {
            const {name, value} = event.target;
            this.setState({[name]: value})
            
          }

        OneditItem = (recipe_id, category) => {
            this.props.history.push(`/edit-recipe/${category}/${recipe_id}`)
              }
              
        onDelete = (recipe_id, recipe_name,category) => {
        confirmAlert(
            {
            title: 'Confirm to delete',
            message:'Are you sure you want to delete '
            +recipe_name,
            confirmLabel:'Delete',
            cancelLabel:'Cancel',
            onConfirm: () => this.handleYes(recipe_id, category),
            onCancel: () => this.handleNo(category)
            }
        )
        this.props.history.push(`/delete-recipe/${category}/${recipe_id}`)
        }

        handleYes = (recipe_id, category) => {
            // event.preventDefault();
            // const recipe_id = this.props.match.params.recipe_id;
            // const category = this.props.match.params.category
            
            axios.delete(`http://127.0.0.1:5000/category/${category}/recipes/${recipe_id}`,
            {headers:{'x-access-token':localStorage.getItem('token')}})
            .then((response) => {
              console.log(response.data);
            this.setState({ successfuldelete: true})
            this.props.history.push(`/view-recipes/${category}`)
              
            })
            .catch((error) => {
              console.log(error.response);
            });
        }
        handleNo = (category) => {
            // event.preventDefault();
            // const recipe_id = this.props.match.params.recipe_id;
            // const category = this.props.match.params.category;
            this.props.history.push(`/view-recipes/${category}`)
        }

        onView= () => {
            this.props.history.push('/view-categories')
        }

        render(){
            
         let recipeitems =  this.state.recipes.map(
             recipes => (<div>
             
             <li>
             <div id="accordion" role="tablist" aria-multiselectable="true">
            <div class="card">
            <div className="col-md-3 col-sm-6 category-card">
            <div class="card-header" role="tab" id="headingOne">
            <h5 class="mb-0">
            <a data-toggle="collapse" data-parent="#accordion" href="#${recipes.recipe_id}`" aria-expanded="true" aria-controls="collapseOne">
                 {recipes.recipe_name}
                 </a>
                 </h5>
                 <div className="card-block">
                <div className='card-body'>
                <Link to= "#" onClick = {()=>this.OneditItem(recipes.recipe_id, recipes.category, recipes.recipe_name, recipes.description)}>
            
                <i className='fa fa-edit'/>
                </Link>
                <Link to = "#" onClick = {() => this.onDelete(recipes.recipe_id, recipes.recipe_name, recipes.category)} className="confirm-delete" data-id={recipes.recipe_id}>
                <i className='fa fa-trash'/>
                </Link>
                </div>
                <h5 className ='card-footer'>
                <Link to='#' onClick = {() => this.onView()}>Back to categories</Link>
                </h5>
                </div>
                </div>
                </div>
                </div>
                </div>
                <div id="`${recipes.recipe_id}`" class="collapse show" role="tabpanel" aria-labelledby="headingOne">
                <div class="card-block">

                {recipes.description}
                </div>
            </div>
                 
                 {recipes.recipe_id}
                 
                 
                 </li>
             </div>
             )
         )

            return(
                <div>
                    <AddRecipe getRecipes={this.onClick} category_id={this.state.category}/>
                    
                    <div>
                    <div>

                    <form className="" onSubmit = {this.onSearch} name="edit-category">
                    <div className="form-group" >
                    <label className="control-label col-sm-4">Recipe Name:</label>
                    <input className="form-group" name="recipe_name" value={this.state.recipe_name} placeholder='Basemera' onChange={this.handleInputChange}/>
                    </div>
                    <div className="form-group"> 
                    <div className="col-sm-offset-5 col-sm-5">
                    <button type="submit" className="btn btn-success">Search</button>
                    </div>
                    </div>

                    </form>
                    </div>

                    view recipes 
                        
                        {this.state.recipes.length
                            ? recipeitems
                            : <div className="col-sm-2 offset-sm-5" className="no-categories">
                            <div className="alert alert-info" role="alert">
              <strong>Ooops!</strong> There are no categories to 
                              display. Please add some.
                            </div>
                            </div>}

                    </div>

                </div>
            )
        }
}
export default ViewRecipes