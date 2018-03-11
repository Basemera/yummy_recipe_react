import React, { Component } from 'react';
import axios from 'axios';
import toastr from 'toastr';
import { notify } from 'react-notify-toast';
import { Redirect } from 'react-router-dom';
import { createRecipes } from '../../api_wrapper/recipes'

class AddRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe_name: '',
      description: '',
      recipeaddedSuccess: false,
    };
  }


  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value })

  }

  onClick = event => {
    event.preventDefault();
    const { recipe_name, description } = this.state;
    const category = this.props.category_id
    console.log("ivawasasas", category)
    createRecipes(category, { recipe_name: this.state.recipe_name, description: this.state.description })
      .then((response) => {
        toastr.success(response.data.message)
        this.props.getRecipes();
        console.log(response.data.message)
        this.setState({ recipeaddedSuccess: true })
      })
      .catch((error) => {
        toastr.error(error.response.data.error)
        console.log(error.response.data.error);
      });
    this.setState({
      recipe_name: '',
      description: '',
      categoryaddedSuccess: false,
    });
  }
  render() {
    const { recipe_name, description } = this.state
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className='jumbotron addrecipe-form'>

              <p> Add recipe</p>

              <form className="form-inline" onSubmit={this.onClick} name="add-category">

                <div className="form-group" >
                  {/* <label className="control-label col-sm-4" >Name:</label> */}
                  <input className="form-group" name="recipe_name" value={this.state.recipe_name} required="True" placeholder='recipe name' onChange={this.handleInputChange} />
                </div>
                <div>
                  {/* <label className="control-label col-sm-4" >Description:  </label> */}
                  <input className="form-group" name="description" value={this.state.description} placeholder='Description' onChange={this.handleInputChange} />
                </div>

                <div className="col-sm-offset-5 col-sm-5">
                  <button type="submit" className="btn btn-success">Add</button>
                </div>


              </form>
            </div>

          </div>
        </div>

      </div>);

  }
}
export default AddRecipe;
