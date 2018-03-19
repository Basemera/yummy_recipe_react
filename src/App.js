import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import './App.css';
import HomeView from './components/homeView';
import SignUp from './components/signUp';
import LogIn from './components/logIn';
import ViewCategories from './components/categories/viewCategories';
import AddCategory from './components/categories/addCategory';
import EditCategory from './components/categories/editCategory';
import DeleteCategory from './components/categories/delete_category';
import ViewRecipes from './components/recipes/viewRecipes';
import AddRecipe from './components/recipes/addRecipe';
import EditRecipe from './components/recipes/editRecipe';
import NotFound from './components/404';
import Footer from './components/footer';
import './css/style.css';
import ProtectedRoute from './components/ProtectedRoute';
import Nav from './components/Nav';

class App extends Component {
    state = {
        loggedin: false,
    };

    componentDidMount() {
        if (localStorage.getItem('token')) {
            this.loginUser();
        }
    }

    onSignout = () => {
        const AUTH_TOKEN_KEY = 'token';
        const clearToken = () => localStorage.removeItem(AUTH_TOKEN_KEY);
        this.setState({
            loggedin: false,
        });
        clearToken();
        
    };

    loginUser = () => {
        this.setState({
            loggedin: true,
        });
    };

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Nav
                        logout={this.onSignout}
                        loggedIn={this.state.loggedin}
                    />
                    <Switch>
                        {/* <Route component={HeaderView}/> */}
                        <Route
                            exact
                            path="/"
                            component={props => (
                                <HomeView
                                    {...props}
                                    loggedIn={this.state.loggedin}
                                />
                            )}
                        />
                        <Route
                            exact
                            path="/register"
                            component={props => (
                                <SignUp
                                    {...props}
                                    loggedIn={this.state.loggedin}
                                />
                            )}
                        />
                        <Route
                            exact
                            path="/login"
                            component={props => (
                                <LogIn
                                    {...props}
                                    login={this.loginUser}
                                    loggedIn={this.state.loggedin}
                                />
                            )}
                        />
                        <ProtectedRoute
                            exact
                            path="/add-category"
                            component={AddCategory}
                            loggedIn={this.state.loggedin}
                        />
                        <ProtectedRoute
                            exact
                            path="/view-categories"
                            component={ViewCategories}
                            loggedIn={this.state.loggedin}
                        />
                        <ProtectedRoute
                            exact
                            path="/edit-category/:category_id/:categoryName"
                            component={EditCategory}
                            loggedIn={this.state.loggedin}
                        />
                        <ProtectedRoute
                            exact
                            path="/delete-category/:category_id"
                            component={DeleteCategory}
                            loggedIn={this.state.loggedin}
                        />
                        <ProtectedRoute
                            exact
                            path="/view-recipes/:category_id"
                            component={ViewRecipes}
                            loggedIn={this.state.loggedin}
                        />
                        <ProtectedRoute
                            exact
                            path="/add-recipe/:category_id/:recipeId"
                            component={AddRecipe}
                            loggedIn={this.state.loggedin}
                        />
                        <ProtectedRoute
                            exact
                            path="/edit-recipe/:category/:recipeId/:recipeName/:description"
                            component={EditRecipe}
                            loggedIn={this.state.loggedin}
                        />
                        <Route component={NotFound} />
                    </Switch>
                    <Footer />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
