import React, { Component } from 'react';
import './BookInList.css';

export default class BookInList extends Component {


    handleBookCommand = (event) => {
        let tagCommand = event.currentTarget.dataset.command;
        this.props.onBookAction(this.props.book, tagCommand);
    }

    render() {
        let isBorrowed = this.props.book.borrowedTo !== undefined;
        let isReserved = this.props.book.reservedBy !== undefined;

        let reserveClassComp = (!isReserved && isBorrowed) ? 'allowed' : '';
        let getClassComp = (!isBorrowed) ? 'allowed' : '';
        let returnClassComp = (this.props.book.borrowedTo === this.props.user && this.props.user) ? 'allowed' : '';
        let returnDate = new Date(this.props.book.returnDate);
        let today = new Date();
        let attentionClassComp = (today > returnDate) ? 'text-danger' : '';

        return (
            <li className="media book-item">
                <div className="book-info media-body">
                    <div>
                        <span className="book-title">{this.props.book.title}</span>
                        <span className="publish-date pull-right">Published: {this.props.book.publishDate}</span>
                    </div>
                    <div>
                        <span className="author-name"><span className="label-item">Author: </span>{this.props.book.author}</span>
                        <div className="pull-right commands">
                            <div className={"reserve-command " + reserveClassComp} data-command="RSV" onClick={this.handleBookCommand}><span className="glyphicon glyphicon-bookmark"></span><p>RSV</p></div>
                            <div className={"get-command " + getClassComp} data-command="GET" onClick={this.handleBookCommand}><span className="glyphicon glyphicon-shopping-cart"></span><p>GET</p></div>
                            <div className={"return-command " + returnClassComp} data-command="RET" onClick={this.handleBookCommand}><span className="glyphicon glyphicon-download-alt"></span><p>RET</p></div>
                            <div className={"attention-command " + attentionClassComp} data-command="ATT" onClick={this.handleBookCommand}><span className="glyphicon glyphicon-flag"></span><p>ATT</p></div>
                        </div>
                    </div>
                    <div className="publisher">{this.props.book.publisher}</div>
                </div>
            </li>
        ); // return
    } // render
};