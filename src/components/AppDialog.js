import React, { Component } from 'react';
import './AppDialog.css';

// Components
import LoginDialog from './dialogs/LoginDialog';
import ItemDetailDialog from './dialogs/ItemDetailDialog';

// Static Data
import { WhichDialogEnum } from './shared/static-data';

export default class AppDialog extends Component {

    // Auxiliary
    mountContent = (comp) => {
        return (<div className="dialog-content">{comp}</div>);
    }

    // State Events
    onCloseDialog = (withRefresh) => {
        this.props.onCloseDialog(withRefresh);
    }

    // React Lifecycles
    render = () => {
        // let mountedDialog = this.getAppDialog(this.props.show);
        let mountedDialog;
        switch (this.props.show) {
            case WhichDialogEnum.LOGIN_DIALOG:
                mountedDialog = this.mountContent(
                    <LoginDialog onLoginSuccess={this.props.loginDialog_onLoginSuccess}
                        onCancel={this.onCloseDialog} />
                );
                break;
            case WhichDialogEnum.ITEM_DETAIL_DIALOG:
                mountedDialog = this.mountContent(
                    <ItemDetailDialog book={this.props.detailItem.item}
                        command={this.props.detailItem.command}
                        token={this.props.token}
                        onCancel={this.onCloseDialog} />
                );
                break;
            default:
                return null;
        }
        return (mountedDialog);
    }
}