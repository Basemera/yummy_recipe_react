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
import NotFound from './components/404'

import HeaderView from './components/header'
import Footer from './components/footer'
import './css/style.css';
import ProtectedRoute from './components/ProtectedRoute'
import  Nav from './components/Nav'


class App extends Component {
  state = {
    loggedin: false
  }
  loginUser = ()=>{
    this.setState({
      loggedin: true
    })
  }

  onSignout = () => {
    const AUTH_TOKEN_KEY = 'token';
    const setToken = token => localStorage.setItem(AUTH_TOKEN_KEY, token);
    const clearToken = () => localStorage.removeItem(AUTH_TOKEN_KEY);
    this.setState(
      {
        loggedin:false
      }
    )
    clearToken()
    // this.props.history.push('/login')
  }

  componentDidMount(){
    if(localStorage.getItem("token")){
      this.loginUser();
    }
  }
  render(){
    return (
      
  <BrowserRouter>
    <div>
      <Nav logout={this.onSignout} loggedIn={this.state.loggedin} />
      <Switch>
        {/* <Route component={HeaderView}/> */}
        <Route exact path="/" component={props => (<HomeView {...props} loggedIn={this.state.loggedin}/>)} />
        <Route exact path="/register" component={props => (<SignUp {...props} loggedIn={this.state.loggedin}/>)} />
        <Route exact path="/login" component={props => (<LogIn {...props} login= {this.loginUser} loggedIn={this.state.loggedin} />)} />
        <ProtectedRoute exact path="/add-category" component={AddCategory} loggedIn={this.state.loggedin} />
        <ProtectedRoute exact path="/view-categories" component={ViewCategories} loggedIn={this.state.loggedin} />
        <ProtectedRoute exact path ="/edit-category/:category_id/:category_name" component={EditCategory} loggedIn={this.state.loggedin} />
        <ProtectedRoute exact path ="/delete-category/:category_id" component={DeleteCategory} loggedIn={this.state.loggedin} />
        <ProtectedRoute exact path ="/view-recipes/:category_id" component={ViewRecipes} loggedIn={this.state.loggedin} />
        <ProtectedRoute exact path ="/add-recipe/:category_id/:recipe_id" component={AddRecipe} loggedIn={this.state.loggedin} />
        <ProtectedRoute exact path ="/edit-recipe/:category/:recipe_id" component={EditRecipe} loggedIn={this.state.loggedin} />
        <Route component={NotFound}/>
      </Switch>
      <Footer/>
    </div>
  </BrowserRouter>
    );
  }
}

export default App;
