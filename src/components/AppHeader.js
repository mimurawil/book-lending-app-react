import React, { Component } from 'react';
import './AppHeader.css';

export default class AppHeader extends Component {

    // Event Listeners
    handleShowLogin = () => {
        this.props.onLoginClicked();
    }

    handleLogout = () => {
        this.props.onLogoutClicked();
    }

    // React Lifecycles
    render() {
        let userOrLogin;
        if (this.props.user) {
            userOrLogin = (
                <div className="logout-container pull-right"><span>Hello {this.props.user}.</span> <button className="btn btn-link" onClick={this.handleLogout}>Log Out</button></div>
            );
        } else {
            userOrLogin = (
                <button className="btn btn-primary login-button pull-right" onClick={this.handleShowLogin}>Log In</button>
            );
        }

        return (
            <header className="header-top">
                <div className="container">
                    <div className="col-xs-7 header-title">
                        <span className="glyphicon glyphicon-book logo-icon"></span>
                        <h1> Super Simple Book Lending App</h1>
                    </div>
                    <div className="col-xs-5">
                        {userOrLogin}
                    </div>
                </div>
            </header>
        );
    }
};