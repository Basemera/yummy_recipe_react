import React, { Component } from 'react';
import axios from 'axios';
import {notify} from 'react-notify-toast';
import toastr from 'toastr';
import {Redirect, Link} from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {Grid, Row, Col, Thumbnail} from 'react-bootstrap'
import AddCategory from './add_category';
// import SearchCategory from './search'
import { deleteCategory, getCategories, editCategory } from '../../api_wrapper/categories';
// import HeaderView from './header'

const CategoryToRender= (props)=>(
  <div>
    <div>
  <div className="card-deck">
  <div className="col-md-3 col-sm-6 category-card">
  
  <div className="card">
  <div className="card-header">
    {props.category_name}
  </div>
  <div className="card-block">
    <div className='card-body'>
    <i className="fa fa-edit" onClick = {()=>props.OneditItem(props.category_id, props.category_name)}/>
    <i className="fa fa-trash" onClick = {() => props.onDelete(props.category_id, props.category_name)} data-id={props.category_id}/>
   
   </div>
    <h5 className ='card-footer'>
    <Link to='#' onClick = {() => props.onView(props.category_id)}>Recipes</Link>
    </h5>
  </div>
</div>
</div>
</div></div>

{/* <Grid>
<Row>
<Col xs={6} md={6}>
      <Thumbnail src="/thumbnaildiv.png" alt="242x200">
      <i className="fa fa-edit" onClick = {()=>props.OneditItem(props.category_id, props.category_name)}/>
    <i className="fa fa-trash" onClick = {() => props.onDelete(props.category_id, props.category_name)} data-id={props.category_id}/>
    <Link to='#' onClick = {() => props.onView(props.category_id)}>Recipes</Link>
      </Thumbnail>
      </Col>
</Row>
  </Grid> */}

</div>
)

class ViewCategories extends Component{
  constructor(props) {
    super(props);
    this.state={
        categories: [],
        category_name:"",
        search:""
      };
  }
  OneditItem = (category_id, category_name) => {
    this.props.history.push(`/edit-category/${category_id}/${category_name}`)
      }

  onView = (category_id) => {
    this.props.history.push(`/view-recipes/${category_id}`)
  }
  
  onDelete = (category_id, category_name) => {
    confirmAlert(
      {
        title: 'Confirm to delete',
        message:'Are you sure you want to delete'
        +category_name,
        confirmLabel:'Delete',
        cancelLabel:'Cancel',
        onConfirm: () => this.handleYes(category_id),
        onCancel: () => this.handleNo()
      }
    )
  }

  handleYes = (category_id) => {
    axios.delete(`http://127.0.0.1:5000/category/${category_id}`,
    {headers:{'x-access-token':localStorage.getItem('token')}})
    .then((response) => {
      console.log(response.data.message);
      toastr.success(response.data.message)
    this.setState({ successfuldelete: true})
    this.props.history.push('/view-categories')
    this.onClick()
      
    })
    .catch((error) => {
      console.log(error.response);
      toastr.error(error.response.data.message)
    });
}
handleNo = () => {
    const {category_name} = this.state;
    const category_id = this.props.match.params.category_id;
    this.props.history.push('/view-categories')
}

onSearch = (event) => {
  event.preventDefault();
  const category_name = event.target.category_name.value
  console.log('baron is that', category_name);
  axios.get(`http://127.0.0.1:5000/category/search?q=${category_name}&per_page=5&page=1`,
  {headers:{'x-access-token':localStorage.getItem('token')}})
  .then((response) => {
    console.log(response.data);
  this.setState({ 
   categories:response.data,
   category_name:""
  });
    
  })
  .catch((error) => {
    console.log(error.response);
  });
}

  componentDidMount(){
      this.onClick()
  }
    
  onClick = () => {
    axios.get('http://127.0.0.1:5000/category', {headers:{'x-access-token':localStorage.getItem('token')}})
    // getCategories()
    .then((response) => {
        this.setState({ categories: response.data}
        )
      })
    
    .catch((error) => {
          console.log(error.response);
          this.props.history.push('/login')
        });

        
  }
  handleInputChange = (event) => {
    const {name, value} = event.target;
    this.setState({[name]: value})
    
  }

  render(){
    let categoryitems = 
    this.state.categories.map(categories => (<CategoryToRender onView = {this.onView} onDelete = {this.onDelete} OneditItem={this.OneditItem} category_name={categories.category_name}
    category_id={categories.category_id} key={categories.category_id}
    />))
        return(
<div>
  <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-primary">
    <div class="container">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup"
                aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
                <a className="nav-item nav-link" href="/">Home
                    <span class="sr-only">(current)</span>
                </a>
            </div>
        </div>
    </div>
</nav>

  <div className = "view-categories-head">
    <div className = "view-categories-head">
    <div>
     
<h4 className="categories-header"> Categories </h4>
<div className="container">
<div className="row"> 
<div className="col-6 row justify-content-center">
        <form className="search-form" onSubmit={this.onSearch} name="search-category">
            <input type="text"  name= "category_name" value = {this.state.category_name} onChange = {this.handleInputChange} className="form-control mb-2 mr-sm-2" placeholder="Category name"></input>
            <button type="submit" class="btn btn-primary mb-2 pxy-4">Search</button>
    </form>
    </div>
    
<div className="col-6 add-category">
<AddCategory getCats={this.onClick}/>

</div>
</div>
</div>



     
<div className = 'view-categories'>          
<div>
  <p className="view-categories-title">
    <Link to="/view-categories" onClick={this.onClick}>
     View all categories
     </Link>
     </p>
  </div>          
<div>
                        {this.state.categories.length
                            ? categoryitems
                            : <div className="col-sm-2 offset-sm-5" className="no-categories">
                            <div className="alert alert-info" role="alert">
              <strong>Ooops!</strong> There are no categories to 
                              display. Please add some.
                            </div>
                            </div>}

                    </div>
                    </div>
             
                    
          
        

    </div>

</div>
</div>

        </div>);

    }

   
  }
export default ViewCategories;
