import React, { Component } from 'react';
import { Pagination } from 'react-bootstrap';

class Paginator extends Component{
    constructor(props){
        super(props);
        this.state={
            currentPage: this.props.currentPage,
            total: this.props.total,
          };
        }

          componentWillReceiveProps(newProps) {
            this.setState({
                currentPage: newProps.currentPage,
                total: newProps.total
            });
        };
        handleSelect(eventKey) {
            this.props.pageChangeHandler(eventKey);
        }
        render() {
            let pages = 7;
            let pageId = [];
            for(let i=1; i <= pages; i++){
                pageId.push(<Pagination.Item>{i}</Pagination.Item>)
            }
            return (
                <Pagination>{pageId}</Pagination>
                /* <Pagination
                    bsSize="medium"
                    items={this.state.total}
                    activePage={this.state.currentPage}
                    onSelect={this.handleSelect}>
                    </Pagination>
                */
            );
        }

      }

export default Paginator;