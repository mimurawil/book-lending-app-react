import React, { Component } from 'react';
import './ItemDetailDialog.css';

// Static Data
import { ItemActionEnum } from '../shared/static-data';

export default class ItemDetailDialog extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false
        }
    }

    // Auxiliary
    callAPI = (path, id) => {
        let setThisState = value => this.setState(value);
        let handleClose = this.handleClose;
        let url = `https://3t6tc5pgwi.execute-api.us-west-2.amazonaws.com/dev/${path}/${id}`;
        let token = this.props.token;
        let client = new XMLHttpRequest();
        client.onload = function () {
            if (this.status === 200) {
                alert('Success!');
                setThisState({ isLoading: false });
                handleClose(true);
            } else {
                alert(this.response);
                setThisState({ isLoading: false });
                handleClose(true);
            }
        };
        client.open('POST', url);
        client.setRequestHeader('Content-Type', 'application/json');
        client.setRequestHeader('Authorization', token);
        client.send();
    }
    reserveItem = id => {
        this.callAPI('reservations', id);
    }

    borrowItem = id => {
        this.callAPI('lendings', id);
    }

    returnItem = id => {
        this.callAPI('returnings', id);
    }

    // State Events
    handleClose = (withRefresh) => {
        if (typeof withRefresh === 'boolean')
            this.props.onCancel(withRefresh);
        else
            this.props.onCancel(false);
    }

    handleCommand = () => {
        switch (this.props.command) {
            case ItemActionEnum.RESERVE:
                this.setState({ isLoading: true });
                this.reserveItem(this.props.book.itemId);
                break;
            case ItemActionEnum.BORROW:
                this.setState({ isLoading: true });
                this.borrowItem(this.props.book.itemId);
                break;
            case ItemActionEnum.RETURN:
                this.setState({ isLoading: true });
                this.returnItem(this.props.book.itemId);
                break;
            default:
                this.handleClose(false);
        }
        this.setState({ isLoading: !this.state.isLoading });
    }

    // React Lifecycles
    render() {
        let command;
        switch (this.props.command) {
            case ItemActionEnum.RESERVE:
                command = 'Reserve';
                break;
            case ItemActionEnum.BORROW:
                command = 'Borrow';
                break;
            case ItemActionEnum.RETURN:
                command = 'Return';
                break;
            default:
                command = 'OK';
        }

        let loadingButton;
        if (this.state.isLoading) {
            loadingButton = (
                <div className="col-xs-3 button-loading-container">
                    <button className="btn btn-xs btn-warning"><span className="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span> Loading...</button>
                </div>
            );
        }

        let availability = 'This book is ';
        if (!this.props.book.borrowedTo) {
            availability += 'available!';
        } else {
            availability += 'already borrowed ';
            if (this.props.book.reservedBy) {
                availability += 'and reserved by another user... sorry!';
            } else {
                availability += 'and it might be available after ' + this.props.book.returnDate;
            }
        }

        let disableSubmit = (!this.props.token && command !== 'OK');

        let mountFeedback = message => {
            return (
                <div className="text-center text-danger small">
                    {message}
                </div>
            );
        }
        let detailFeedback;
        if (!this.props.token && command !== 'OK') {
            detailFeedback = mountFeedback('Must login first!');
        }

        return (
            <div className="item-container container">
                <span className="glyphicon glyphicon-remove close-container" onClick={this.handleClose}></span>
                <div className="row">
                    <p className="book-title">{this.props.book.title}</p>
                </div>
                <div className="row">
                    <p className="author-name"><span className="label-item">Author: </span>{this.props.book.author}</p>
                </div>
                <div className="row">
                    <p className="publish-date"><span className="label-item">Publish: </span>{this.props.book.publisher} - {this.props.book.publishDate}</p>
                </div>
                <div className="row">
                    <p className="availability"><span className="label-item">Availability: </span>{availability}</p>
                </div>

                <div className="row button-container">
                    <div className="col-xs-offset-3 col-xs-6">
                        <input type="submit" className="btn btn-success" onClick={this.handleCommand} value={command} disabled={disableSubmit} />
                    </div>
                    {loadingButton}
                </div>

                {detailFeedback}

            </div>
        );
    }
}