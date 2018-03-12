import React, { Component } from 'react';
import axios from 'axios';
import { notify } from 'react-notify-toast';
import { Redirect, Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import toastr from 'toastr';
import AddRecipe from './add_recipes'
import EditRecipe from './edit_recipes';
import { deleteRecipes, getRecipes, searchRecipes, recipesSearchChangePage, searchClickRecipes } from '../../api_wrapper/recipes'
import { signout } from '../../utils/authservice';


class ViewRecipes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
            category_id: this.props.match.params.category_id,
            recipe_name: "",
            total:"",
            currentPage:"",
           itemsPerPage:"",
           search:false
        };
    }

    onSearch = (event) => {
        event.preventDefault();
        const recipe_name = event.target.recipe_name.value
        this.setState({recipe_name:recipe_name})
        const category = this.state.category_id
        console.log('baron is that', recipe_name);
        searchRecipes(recipe_name, category)
            .then((response) => {
             toastr.success("Search item found")
                console.log(response.data.results);
                this.setState({
                    recipes: response.data.results,
                    total:response.data.count,
                    itemsPerPage:response.data.per_page,
                    search:true
                });

            })
            .catch((error) => {
                console.log(error.response);
                toastr.error(error.response.data.message)
                this.onClick()
            });
    }

    componentDidMount() {
        this.onClick();
    }

    onClick = () => {
        const category = this.props.match.params.category_id
        getRecipes(category)
            .then((response) => {
                console.log(response.data.results)
                this.setState({
                    recipes: response.data.results,
                    recipe_name: "",
                    total:response.data.count
                });
            })

            .catch((error) => {
                console.log(error.response);
                this.props.history.push('/login')
                toastr.error(error.response.message)
            });


    }

    handleClick(number){
        const category = this.props.match.params.category_id
        recipesSearchChangePage(number, category)
        .then((response) => {
          this.setState({ recipes: response.data.results,
            currentPage:response.data.pagenumber,
           itemsPerPage:4})
    
        })
    }
    handleSearchClick = (event, pages) => {
        event.preventDefault();
        const category = this.props.match.params.category_id
        const recipe_name = this.state.recipe_name
        searchClickRecipes(recipe_name, pages, category)
        .then((response) => {
          console.log(response.data)
          this.setState({ recipes: response.data.results,
            currentPage:response.data.pagenumber,
           itemsPerPage:4})
    
        })
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value })

    }

    OneditItem = (recipe_id, category) => {
        this.props.history.push(`/edit-recipe/${category}/${recipe_id}`)
    }

    onSignout = () => {
        const AUTH_TOKEN_KEY = 'token';
        const setToken = token => localStorage.setItem(AUTH_TOKEN_KEY, token);
        const clearToken = () => localStorage.removeItem(AUTH_TOKEN_KEY);
        clearToken()
        this.props.history.push('/')
    }

    onDelete = (recipe_id, recipe_name, category) => {
        confirmAlert(
            {
                title: 'Confirm to delete',
                message: 'Are you sure you want to delete '
                    + recipe_name,
                confirmLabel: 'Delete',
                cancelLabel: 'Cancel',
                onConfirm: () => this.handleYes(recipe_id, category),
                onCancel: () => this.handleNo(category)
            }
        )
    }

    handleYes = (recipe_id, category) => {
        const category2 = this.props.match.params.category_id
        deleteRecipes(category2, recipe_id)
        .then((response) => {
          toastr.success(response.data.message)
        this.setState({ successfuldelete: true})
        this.onClick();
          
        })
        .catch((error) => {
          console.log(error.response);
          toastr.error(error.response)
        });
    }
    handleNo = (category) => {
        const category2 = this.props.match.params.category_id;
        this.onClick();
    }

    onView = () => {
        this.props.history.push('/view-categories')
    }

    render() {
        let recipeitems = this.state.recipes.map(
            recipes => (<div className="col-md-4 col-lg-4 recipe-card">
                <li>
                    <div id="accordion" role="tablist" aria-multiselectable="true">
                        <div class="card-deck">
                            <div className="card category-card">
                                <div className="card-header" role="tab" id="headingOne">
                                    <h5 className="mb-0">
                                        <a data-toggle="collapse" data-parent="#accordion" href="#${recipes.recipe_id}`" aria-expanded="true" aria-controls="collapseOne">
                                            {recipes.recipe_name}
                                        </a>
                                    </h5>
                                    <div className="card-block">
                                        <div className='card-body'>
                                            <Link id="recipe-link" to="#" onClick={() => this.OneditItem(recipes.recipe_id, recipes.category, recipes.recipe_name, recipes.description)}>

                                                <i className='fa fa-edit' />
                                            </Link>
                                            <Link to="#" onClick={() => this.onDelete(recipes.recipe_id, recipes.recipe_name, recipes.category)} className="confirm-delete" data-id={recipes.recipe_id}>
                                                <i className='fa fa-trash' />
                                            </Link>
                                        </div>

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

        const { total, search }=this.state
        let loadPagination;
        const pageNumbers = [];
       if(total > 4){
           for (let i = 1; i <= Math.ceil(total /4); i++) {
               pageNumbers.push(i);
           }
       } else {
           pageNumbers.push(1);
       }
            if (search ===false){
                loadPagination = 
                pageNumbers.map((number) => {
                return(
                    <li className="page-item" key={number} style={{display: 'inline-block'}}>
                    <a className="page-link" onClick={() => this.handleClick(number)} key={number} id={number}>{number}</a>
                    </li> 
                );  
                })
            }
            else if(search === true){
                loadPagination = 
            pageNumbers.map((pages) => {
            return(
                <li className="page-item" key={pages} style={{display: 'inline-block'}}>
                <a className="page-link" onClick={event => this.handleSearchClick(event,pages)} key={pages} id={pages}>{pages}</a>
                </li> 
            );  
            })
            }
            

        return (

            
            <div className="recipes-view">
            <h5 className='card-footer'>
                <button onClick={this.onSignout}>signout</button>
                <Link to='#' onClick={() => this.onView()}>Back to categories</Link>
            </h5>
                <div className="container">
                    <div className="row">

                        <h4 className="categories-header"> Recipes </h4>
                        <div className="col-4 row justify-content-center">
                            <form className="search-form-recipes" onSubmit={this.onSearch} name="search-recipes">
                                <input className="form-group" name="recipe_name" value={this.state.recipe_name} placeholder='recipe name' onChange={this.handleInputChange} />
                                <button type="submit" className="btn btn-primary mb-2 pxy-4">Search</button>
                            </form>
                        </div>
                        <div>
                            <div className="col-6 add-recipe">
                                <AddRecipe getRecipes={this.onClick} category_id={this.state.category} />
                            </div>



                        </div>
                        
                    </div>
                    <ul className="pagination justify-content-center">
                        {loadPagination}
                    </ul>
                    <div className="row">
                    {this.state.recipes.length
                        ? recipeitems
                        : <div className="col-sm-4 col-lg-4" className="no-categories">
                            <div className="alert alert-info" role="alert">
                                <strong>Ooops!</strong> There are no recipes to
                                                display. Please add some.
                            </div>
                        </div>}
</div>
                </div>

            </div>
        )
    }
}
export default ViewRecipes