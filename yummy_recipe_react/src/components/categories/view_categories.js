import React, { Component } from 'react';
import axios from 'axios';
import { notify } from 'react-notify-toast';
import toastr from 'toastr';
import { Redirect, Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Pagination } from 'react-bootstrap';
import { Grid, Row, Col, Thumbnail } from 'react-bootstrap'
import AddCategory from './add_category';
import { deleteCategory, getCategories, editCategory, searchCategories, categoriesSearchChangePage, searchClickCategories } from '../../api_wrapper/categories';
import Paginator from '../pagination'
import { getToken } from '../../utils/authservice';




const CategoryToRender = (props) => (
  <div className="col-md-6 col-lg-3 category-card">
    <div className="card mb-3">
      <div className="card">
        <div className="card-header">
          {props.category_name}
        </div>
        <div className="card-block">
          <div className='card-body'>
            <i className="fa fa-edit" onClick={() => props.OneditItem(props.category_id, props.category_name)} />
            <i className="fa fa-trash" onClick={() => props.onDelete(props.category_id, props.category_name)} data-id={props.category_id} />
          </div>
          <h5 className='card-footer'>
            <Link to='#' onClick={() => props.onView(props.category_id)}>Recipes</Link>
          </h5>
        </div>
      </div>

    </div>
  </div>
)



class ViewCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      category_name: "",
      search: "", 
      total:"",
      currentPage:"",
      search:false
      
    };
  }

  pageChangeHandler = () => {
    this.props.onPaginate();
};


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
        message: 'Are you sure you want to delete  '
          + category_name,
        confirmLabel: 'Delete',
        cancelLabel: 'Cancel',
        onConfirm: () => this.handleYes(category_id),
        onCancel: () => this.handleNo()
      }
    )
  }

  handleYes = (category_id) => {
    deleteCategory(category_id)
      .then((response) => {
        toastr.success(response.data.message)
        this.setState({ successfuldelete: true })
        this.props.history.push('/view-categories')
        this.onClick()

      })
      .catch((error) => {
        toastr.error(error.response.data.message)
      });
  }
  handleNo = () => {
    const { category_name } = this.state;
    const category_id = this.props.match.params.category_id;
    this.props.history.push('/view-categories')
  }

  onSearch = (event) => {
    event.preventDefault();
    const category_name = event.target.category_name.value
    this.setState({category_name:category_name})
    searchCategories(category_name)
      .then((response) => {
        toastr.success("Search item found")
        this.setState({ categories: response.data.results,
          total: response.data.count,
          currentPage:response.data.pagenumber,
         itemsPerPage:response.data.per_page,
         category_name:category_name,
        search:true});

      })
      .catch((error) => {
        toastr.error(error.response.data.message)

      });
  }

  componentDidMount() {
    this.onClick()
  }

  onClick = () => {
    this.setState({category_name:""})
    getCategories()
      .then((response) => {
       console.log(response.data.results)
        this.setState({ categories: response.data.results,
          total: response.data.count,
          currentPage:response.data.pagenumber,
         itemsPerPage:8,
         search:false})
      })

      .catch((error) => {
        console.log(getToken)
        if (getToken=="") {
          this.props.history.push('/login')
        }
        // this.props.history.push('/login')
        console.log(error.response.data.message)
      });
  }

  handleClick(number){
    categoriesSearchChangePage(number)
    .then((response) => {
      console.log(response.data)
      this.setState({ categories: response.data.results,
        total: response.data.count,
        currentPage:response.data.pagenumber,
       itemsPerPage:8})

    })

    .catch((error) => {
      console.log(error.response);
      this.props.history.push('/login')
    });
  }

  handleSearchClick = (event, pages) => {
    event.preventDefault();
    const category_name = this.state.category_name
    console.log(category_name)
    searchClickCategories(category_name, pages)
    .then((response) => {
      console.log(response.data)
      // console.log(response.data.count)
      this.setState({ categories: response.data.results,
        search:true,
        currentPage:response.data.pagenumber,
       itemsPerPage:8})

    })
}

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value })

  }

  render() {
    let categoryitems =
      this.state.categories.map(categories => (<CategoryToRender onView={this.onView} onDelete={this.onDelete} OneditItem={this.OneditItem} category_name={categories.category_name}
        category_id={categories.category_id} key={categories.category_id}
      />)
      )
      
      const { total, search }=this.state
        let loadPagination;
        const pageNumbers = [];
       if(total > 8){
           for (let i = 1; i <= Math.ceil(total /8); i++) {
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
      <div>
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-primary">
          <div className="container">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <a className="nav-item nav-link" href="/">Home
                    <span className="sr-only">(current)</span>
                </a>
              </div>
            </div>
          </div>
        </nav>
       
        <div className="view-categories-head">
          <div className="view-categories-head">
            <div>

              <h4 className="categories-header"> Categories </h4>
              <div className="container">
                <div className="row">
                  <div className="col-6 row justify-content-center">
                    <form className="search-form" onSubmit={this.onSearch} name="search-category">
                      <input required id ="category-name" type="text" name="category_name" value={this.state.category_name} onChange={this.handleInputChange} className="form-control mb-2 mr-sm-2" placeholder="Category name"></input>
                      <button type="submit" className="btn btn-primary mb-2 pxy-4">Search</button>
                    </form>
                  </div>

                  <div className="col-6 add-category">
                    <AddCategory getCats={this.onClick} />
                  
                  </div>
                </div>
              </div>


             <ul className="pagination justify-content-center">
        {loadPagination}
      </ul>

              <div className='view-categories'>
                <div>
                  <p className="view-categories-title">
                    <Link to="/view-categories" onClick={this.onClick}>
                      View all categories
     </Link>
                  </p>
                </div>
                <div className="row">
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
