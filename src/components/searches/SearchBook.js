import React, { Component } from 'react';
import './SearchBook.css';

export default class SearchBook extends Component {
    handleSort = (e) => {
        this.props.onSortList(e.target.id, this.props.orderDir);
    }

    handleOrder = (e) => {
        this.props.onSortList(this.props.orderBy, e.target.id);
    }

    handleChange = (e) => {
        this.props.onFilterList(e.target.value);
    }

    render() {
        return (
            <div className="container search-container">
                <div className="col-sm-offset-3 col-sm-6">
                    <div className="input-group">
                        <input id="SearchBooks" onChange={this.handleChange} placeholder="Search" type="text" className="form-control" aria-label="Search Books" />
                        <div className="input-group-btn">
                            <button type="button" className="btn btn-primary dropdown-toggle"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Sort by: <span className="caret"></span></button>
                            <ul className="dropdown-menu dropdown-menu-right">
                                <li><a href="#" onClick={this.handleSort} id="title">Title {(this.props.orderBy === 'title') ? <span className="glyphicon glyphicon-ok"></span> : null}</a></li>
                                <li><a href="#" onClick={this.handleSort} id="author">Author {(this.props.orderBy === 'author') ? <span className="glyphicon glyphicon-ok"></span> : null}</a></li>
                                <li><a href="#" onClick={this.handleSort} id="publisher">Publisher {(this.props.orderBy === 'publisher') ? <span className="glyphicon glyphicon-ok"></span> : null}</a></li>
                                <li><a href="#" onClick={this.handleSort} id="publishDate">Publish Date {(this.props.orderBy === 'publishDate') ? <span className="glyphicon glyphicon-ok"></span> : null}</a></li>
                                <li role="separator" className="divider"></li>
                                <li><a href="#" onClick={this.handleOrder} id="asc">Asc{(this.props.orderDir === 'asc') ? <span className="glyphicon glyphicon-ok"></span> : null}</a></li>
                                <li><a href="#" onClick={this.handleOrder} id="desc">Desc{(this.props.orderDir === 'desc') ? <span className="glyphicon glyphicon-ok"></span> : null}</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>); // return
    } // render
};
