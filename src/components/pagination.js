import React, { Component } from 'react';
import { Pagination } from 'react-bootstrap';

class Paginator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: this.props.currentPage,
            total: this.props.total,
        };
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            currentPage: newProps.currentPage,
            total: newProps.total,
        });
    }
    handleSelect(eventKey) {
        this.props.pageChangeHandler(eventKey);
    }
    render() {
        const pages = 7;
        const pageId = [];
        for (let i = 1; i <= pages; i++) {
            pageId.push(<Pagination.Item>{i}</Pagination.Item>);
        }
        return <Pagination>{pageId}</Pagination>;
    }
}

export default Paginator;
