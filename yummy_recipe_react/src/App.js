import React, { Component } from 'react';
import {Link, Route, BrowserRouter,Switch} from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import HomeView from './components/home';
import SignUp from './components/signup';
// import HeaderView from './components/header';
// import Footer from './components/footer';
import LogIn from './components/login';
import ViewCategories from './components/categories/view_categories'
import AddCategory from './components/categories/add_category'
import EditCategory from './components/categories/edit_category'
import DeleteCategory from './components/categories/delete_category'
import ViewRecipes from './components/recipes/view_recipes'
import AddRecipe from './components/recipes/add_recipes'
import EditRecipe from './components/recipes/edit_recipes'
import DeleteRecipe from './components/recipes/delete_recipes'
import HeaderView from './components/header'
import './css/style.css';


class App extends Component {
  render(){
    return (
      
  <BrowserRouter>
    <div>
      <Switch>
        {/* <Route component={HeaderView}/> */}
        <Route exact path="/" component={HomeView}/>
        <Route exact path="/register" component={SignUp}/>
        <Route exact path="/login" component={LogIn}/>
        <Route exact path="/add-category" component={AddCategory}/>
        <Route exact path="/view-categories" component={ViewCategories}/>
        <Route exact path ="/edit-category/:category_id/:category_name" component={EditCategory}/>
        <Route exact path ="/delete-category/:category_id" component={DeleteCategory}/>
        <Route exact path ="/view-recipes/:category_id" component={ViewRecipes}/>
        <Route exact path ="/add-recipe/:category_id/:recipe_id" component={AddRecipe}/>
        <Route exact path ="/edit-recipe/:category/:recipe_id" component={EditRecipe}/>
        <Route exact path ="/delete-recipe/:category/:recipe_id" component={DeleteRecipe}/>
        

      </Switch>
    </div>
  </BrowserRouter>
    );
  }
}

export default App;
