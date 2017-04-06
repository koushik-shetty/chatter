/**
 * Client Entry File
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import '../../static/main.scss';
import MessageList from './components/MessageList.jsx';
import SendText from './components/SendText.jsx';
import UserNameEntry from './components/UserNameEntry.jsx';
import Welcome from './components/Welcome.jsx';
import { Messages } from './models/Message';
import { Type } from '../constants';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            messages: {},
        };
        this.onMessageReceived = this.onMessageReceived.bind(this);
    }

    onMessageReceived(message) {
        switch (message.type) {
            case Type.Broadcast:
                this.setState({
                    messages: this.state.messages.add(message),
                });
                break;
            case Type.Update:
                this.setState({
                    messages: this.state.messages.update(message),
                });
                break;
            case Type.Delete:
                this.setState({
                    messages: this.state.messages.delete(message.payload)
                });
            default:
        }
    }

    onDelete(id) {
        this.messenger.send(id, Type.Delete);
    }

    _onUsernameEntry(messenger) {
        this.messenger = messenger;
        this.messenger.setMessageCb(this.onMessageReceived);
        const messages = new Messages(messenger.getMessageFormatter());
        this.setState({
            messages,
            username: messenger.getUsername(),
        });
    }

    componentWillUnmount() {
        this.messenger.close();
    }


    render() {
        if (this.state.username) {
            return (
                <div className="app-container" >
                    <Welcome username={this.state.username} />
                    <MessageList
                        messages={this.state.messages.get()}
                        messenger={this.messenger}
                        onDelete={id => this.onDelete(id)}
                        user={this.state.username}
                    />
                    <SendText messenger={this.messenger}
                    />
                </div>
            );
        } else {
            return (
                <div className="app-container-user-name" >
                    <UserNameEntry onUsernameEntry={username => this._onUsernameEntry(username)} />
                </div>
            )
        }
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
)