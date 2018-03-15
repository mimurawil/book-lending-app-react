import React, { Component } from 'react';
import './App.css';

// Components
import AppHeader from './components/AppHeader';
import AppDialog from './components/AppDialog';
import AppContent from './components/AppContent';

// Static Data
import { WhichDialogEnum } from './components/shared/static-data';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loginOptions: {
                activeUser: undefined,
                token: undefined
            },
            dialogOptions: {
                show: undefined,
                detailItem: {
                    item: undefined,
                    command: undefined
                }
            }
        };
    }

    // State Events
    // From AppDialog
    signInSuccess = (userName, tokenAccess) => {
        this.setState({
            loginOptions: {
                activeUser: userName,
                token: tokenAccess
            },
            dialogOptions: {
                show: undefined
            }
        });
    }

    unmountDialog = (withRefresh) => {
        this.setState({
            dialogOptions: {
                show: undefined
            },
            refresh: withRefresh
        });
    }

    // From AppHeader
    showLoginDialog = () => {
        this.setState({
            dialogOptions: {
                show: WhichDialogEnum.LOGIN_DIALOG
            }
        });
    }

    logout = () => {
        this.setState({
            loginOptions: {
                activeUser: undefined,
                token: undefined
            }
        });
    }

    // From AppContent
    showItemDetailDialog = (item, command) => {
        this.setState({
            dialogOptions: {
                show: WhichDialogEnum.ITEM_DETAIL_DIALOG,
                detailItem: {
                    item: item,
                    command: command
                }
            }
        });
    }

    listDidRefresh = () => {
        this.setState({
            refresh: false
        });
    }


    // React Lifecycles
    componentWillUnmount = () => {
        // unmount states
        this.setState({
            loginOptions: {
                activeUser: undefined,
                token: undefined
            }
        });
    }

    render() {
        return (
            <div className="interface">
                <AppDialog show={this.state.dialogOptions.show}
                    detailItem={this.state.dialogOptions.detailItem}
                    user={this.state.loginOptions.user}
                    token={this.state.loginOptions.token}
                    loginDialog_onLoginSuccess={this.signInSuccess}
                    onCloseDialog={this.unmountDialog} />

                <AppHeader user={this.state.loginOptions.activeUser}
                    onLoginClicked={this.showLoginDialog}
                    onLogoutClicked={this.logout} />

                <AppContent user={this.state.loginOptions.activeUser}
                    refresh={this.state.refresh}
                    onRefresh={this.listDidRefresh}
                    onDetailBook={this.showItemDetailDialog} />
            </div>
        );
    }
}

export default App;
