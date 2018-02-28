import React, { Component } from 'react';
import axios from 'axios';
import {notify} from 'react-notify-toast';
import {Redirect, Link} from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
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
</div></div></div>
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
    // this.props.history.push(`/delete-category/${category_id}`)
    // this.props.history.push('/view-categories')
  }

  handleYes = (category_id) => {
    axios.delete(`http://127.0.0.1:5000/category/${category_id}`,
    {headers:{'x-access-token':localStorage.getItem('token')}})
    .then((response) => {
      console.log(response.data);
    this.setState({ successfuldelete: true})
    this.props.history.push('/view-categories')
    this.onClick()
      
    })
    .catch((error) => {
      console.log(error.response);
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
        this.setState({ categories: response.data })
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
  <div className = "view-categories-head">
    <div className = "view-categories-head">
    <div>
     
<h4 className="categories-header"> Categories </h4>
<div>
  
   <form className="" onSubmit = {this.onSearch} name="edit-category">
    <div className="form-group" >
    <label className="control-label col-sm-4">Category Name:</label>
    <input className="form-group" name="category_name" value={this.state.category_name} placeholder='Basemera' onChange={this.handleInputChange}/>
    </div>
<div className="form-group"> 
  <div className="col-sm-offset-5 col-sm-5">
  <button type="submit" className="btn btn-success">Search</button>
</div>
</div>

</form>
     </div>
<div className="add-category">
<AddCategory getCats={this.onClick}/>

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
