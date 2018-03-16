import React, { Component } from 'react';
import './LoginDialog.css';

export default class LoginDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showLoginForm: true,
            enableRegister: false,
            enableLogin: true,
            isLoading: false,
        };
    }

    handleLogin = (event) => {
        event.preventDefault();
        let username = document.getElementById('loginUsername').value;
        let password = document.getElementById('loginPassword').value;

        this.setState({
            isLoading: true,
            enableLogin: false,
            errorLogin: undefined
        });
        let setThisState = value => this.setState(value);
        let onLoginSuccess = this.props.onLoginSuccess;
        let client = new XMLHttpRequest();
        client.onload = function (data) {
            if (this.status === 200) {
                setThisState({
                    errorLogin: false,
                    isLoading: false,
                    enableLogin: true
                });
                let jsonResponse = JSON.parse(this.response);
                onLoginSuccess(username, jsonResponse.token);
            } else {
                setThisState({
                    errorLogin: true,
                    isLoading: false,
                    enableLogin: true
                });
                document.getElementById('loginUsername').focus();
            }
        };
        client.open('POST', `https://YOUR-URL-API.REGION.amazonaws.com/dev/book-lending-api/authentication`);
        client.setRequestHeader('Content-Type', 'application/json');
        client.send(JSON.stringify({
            userName: username,
            userPassword: password
        }));
    }

    loginForm() {
        let loginFeedback;
        if (this.state.errorLogin) {
            loginFeedback = (
                <div className="login-feedback">Invalid username or password.</div>
            );
        }

        let loadingButton;
        if (this.state.isLoading) {
            loadingButton = (
                <div className="text-center">
                    <button className="btn btn-sm btn-warning"><span className="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span> Loading...</button>
                </div>
            );
        }

        return (
            <form id="login-form" method="post">
                <div className="form-group">
                    <input type="text" name="username" id="loginUsername" tabIndex="1" className="form-control" placeholder="Username" required />
                </div>
                <div className="form-group">
                    <input type="password" name="password" id="loginPassword" tabIndex="2" className="form-control" placeholder="Password" required />
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-sm-6 col-sm-offset-3">
                            <input type="submit" name="login-submit" id="login-submit" tabIndex="4" className="form-control btn btn-login" value="Log In" onClick={this.handleLogin} disabled={!this.state.enableLogin} />
                        </div>
                    </div>
                </div>
                {loadingButton}
                {loginFeedback}
                <div className="small text-center text-info">
                    Don't wanna register? You can try one of the default users: <br />
                    u: simple - p: haha <br />
                    u: friend - p: hehe <br />
                    u: amigo  - p: hehe
                </div>
            </form>
        );
    }

    handleRegister = (event) => {
        event.preventDefault();
        let username = document.getElementById('registerUsername').value;
        let password = document.getElementById('registerPassword').value;
        let confirmPassword = document.getElementById('registerConfirmPassword').value;

        this.setState({
            isLoading: true,
            enableRegister: false,
            errorRegister: undefined
        });

        let setThisState = value => this.setState(value);
        let client = new XMLHttpRequest();
        client.onload = function (data) {
            if (this.status === 200) {
                setThisState({
                    showLoginForm: true,
                    isLoading: false
                });
            } else {
                setThisState({
                    errorRegister: this.response,
                    isLoading: false
                });
            }
        };
        client.open('POST', `https://YOUR-URL-API.REGION.amazonaws.com/dev/book-lending-api/registration`);
        client.setRequestHeader('Content-Type', 'application/json');
        client.send(JSON.stringify({
            userName: username,
            userPassword: password,
            confirmPassword: confirmPassword
        }));
    }

    handleValidation = (event) => {
        let userName = document.getElementById('registerUsername').value;
        let userPassword = document.getElementById('registerPassword').value;
        let confirmPassword = document.getElementById('registerConfirmPassword').value;

        if (userName === '') {
            this.setState({
                errorRegister: "Username is required",
                enableRegister: false
            });
            return;
        }

        if (userPassword === '') {
            this.setState({
                errorRegister: "Password is required",
                enableRegister: false
            });
            return;
        }

        if (confirmPassword === '') {
            this.setState({
                errorRegister: "Confirm Password",
                enableRegister: false
            });
            return;
        }

        if (userPassword !== confirmPassword) {
            this.setState({
                errorRegister: "Passwords must match",
                enableRegister: false
            });
            return;
        }

        this.setState({
            errorRegister: undefined,
            enableRegister: true
        });

    }

    registerForm() {
        let registerFeedback;
        if (this.state.errorRegister) {
            registerFeedback = (
                <div className="register-feedback">{this.state.errorRegister}</div>
            );
        }

        let loadingButton;
        if (this.state.isLoading) {
            loadingButton = (
                <div className="text-center">
                    <button className="btn btn-sm btn-warning"><span className="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span> Loading...</button>
                </div>
            );
        }

        return (
            <form id="register-form" method="post">
                <div className="form-group">
                    <input type="text" name="username" id="registerUsername" tabIndex="1" className="form-control is-invalid" placeholder="Username" onChange={this.handleValidation} />
                </div>
                <div className="form-group">
                    <input type="password" name="password" id="registerPassword" tabIndex="2" className="form-control" placeholder="Password" onChange={this.handleValidation} />
                </div>
                <div className="form-group">
                    <input type="password" name="confirm-password" id="registerConfirmPassword" tabIndex="2" className="form-control" placeholder="Confirm Password" onChange={this.handleValidation} />
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-sm-6 col-sm-offset-3">
                            <input type="submit" name="register-submit" id="register-submit" tabIndex="4" className="form-control btn btn-register" value="Register Now" onClick={this.handleRegister} disabled={!this.state.enableRegister} />
                        </div>
                    </div>
                </div>
                {loadingButton}
                {registerFeedback}
            </form>
        );
    }

    handleShowLogin = () => {
        this.setState({
            showLoginForm: true
        });
    }

    handleShowRegister = () => {
        this.setState({
            showLoginForm: false,
            enableRegister: false
        });
    }

    handleClose = () => {
        if (!this.state.isLoading) this.props.onCancel(false);
    }

    // React Lifecycles
    render = () => {
        let form = this.state.showLoginForm ? this.loginForm() : this.registerForm();

        return (
            <div className="container login-container">
                <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                        <div className="panel panel-login">
                            <span className="glyphicon glyphicon-remove close-container" onClick={this.handleClose}></span>
                            <div className="panel-heading">
                                <div className="row">
                                    <div className="col-xs-6">
                                        <button className={"btn btn-link button-border-outline-none" + (this.state.showLoginForm ? " active" : "")} onClick={this.handleShowLogin}>Login</button>
                                    </div>
                                    <div className="col-xs-6">
                                        <button className={"btn btn-link button-border-outline-none" + (!this.state.showLoginForm ? " active" : "")} onClick={this.handleShowRegister}>Register</button>
                                    </div>
                                </div>
                                <hr />
                            </div>
                            <div className="panel-body">
                                <div className="row">
                                    <div className="col-lg-12">
                                        {form}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } // render
};