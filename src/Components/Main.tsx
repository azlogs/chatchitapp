import React from 'react';
import Welcome from './Welcome';
import Sidebar from './Sidebar';
import Popup from './Popup';
import ChatWindow from './ChatWindows';
import Logout from './Logout';
import { Provider } from 'react-redux';
import './Main.css';
import store from '../Redux/Stores';
import Login from './Login';
import { getUser } from '../Common';
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../Redux/ChatchitReducers';

export default class ChatChitMain extends React.Component {

    state = {
        isStartNewConversation: false
    };

    StartConversationHandler = () => {
        this.setState({ isStartNewConversation: true });
    }

    closePopupHandler = () => {
        this.setState({ isStartNewConversation: false });
    }

    openChatWindowHandler = (contact: any) => {
        this.setState({ isStartNewConversation: false });
    }

    loginHander = () => {
        this.forceUpdate();
    }

    renderRounter = () => {
        return (
            <ConnectedRouter history={history}>
                <div className="main">
                    <PrivateComponent Component={Sidebar} StartConversationHandler={this.StartConversationHandler} />

                    <Switch>
                        <PublicRoute path="/Login" Component={Login}
                            history={history}
                            loginHander={this.loginHander} ></PublicRoute>

                        <PrivateRoute path="/chat/:chatchitId" Component={ChatWindow} />
                        <PrivateRoute path="/logout" Component={Logout} />
                        <PrivateRoute path="/home" StartConversationHandler={this.StartConversationHandler} Component={Welcome} />
                        <PrivateRoute path="/" StartConversationHandler={this.StartConversationHandler} Component={Welcome} />
                    </Switch>

                    {this.state.isStartNewConversation ?
                        <Popup closeHandler={this.closePopupHandler} />
                        : null}
                </div>
            </ConnectedRouter>
        );
    }

    render = () =>
        <Provider store={store}>
            {this.renderRounter()}
        </Provider>;
}

const PrivateRoute = ({ Component, path, ...props }: any) => {
    var user = getUser();
    if (user) {
        return (
            <Route
                {...path}
                render={() => <Component {...props} />}
            />
        )
    }

    return <Redirect to={{ pathname: '/login', state: { from: window.location.pathname } }} />;
}

const PublicRoute = ({ Component, path, ...props }: any) => {
    return (
        <Route
            {...path}
            render={() => <Component {...props} />}
        />
    )
}

const PrivateComponent = ({ Component, ...props }: any) => {
    var user = getUser();
    if (user) {
        return (
            <Component {...props} />
        )
    }

    return null;
}