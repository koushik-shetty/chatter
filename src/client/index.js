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

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
        };
    }
    
    onDelete(id) {
        console.log('on delete', id);
    }

    _onUsernameEntry(username) {
        console.log('username--', username);
        this.setState({ username });
    }

    render() {
        if (this.state.username) {
            return (
                <div className="app-container" >
                    <Welcome username={this.state.username} />
                    <MessageList
                        messages={msg}
                        onDelete={id => this.onDelete(id)}
                        user={'Koushik'}
                    />
                    <SendText 
                    />
                </div>
            );
        } else {
            return (
                <div className="app-container-user-name" >
                    <UserNameEntry onUsernameEntry={username => this._onUsernameEntry(username)}/>
                </div>
            )
        }
    }
}
const msg = [
    {
        id: '1',
        text: 'message 1alskdjf;lksjd;fljas;l j;alsdf;lasf;ljs;lkasdf ;sd;laskdfl;asjdf;lasd;fas;dlfalsdkjf asdf asdf lqwej sdfo sadfkn laksjb lkjasbf, lklk lbk kjbk j--------------->>',
        sender: 'Bijal Parekh',
    },
    {
        id: '2',
        text: 'message 2',
        sender: 'Bijal',
    },
    {
        id: '3',
        text: 'message 3',
        sender: 'Koushik',
    },
    {
        id: '4',
        text: 'message 4',
        sender: 'Kusuma',
    },
    {
        id: '5',
        text: 'message 5',
        sender: 'Koushik Shetty',
    },
    {
        id: '6',
        text: 'message 1alskdjf;lksjd;fljas;l j;alsdf;lasf;ljs;lkasdf ;sd;laskdfl;asjdf;lasd;fas;dlfalsdkjf asdf asdf lqwej sdfo sadfkn laksjb lkjasbf, lklk lbk kjbk j--------------->>',
        sender: 'Bijal',
    },
    {
        id: '7',
        text: 'message 1alskdjf;lksjd;fljas;l j;alsdf;lasf;ljs;lkasdf ;sd;laskdfl;asjdf;lasd;fas;dlfalsdkjf asdf asdf lqwej sdfo sadfkn laksjb lkjasbf, lklk lbk kjbk j--------------->>',
        sender: 'Bijal',
    },
    {
        id: '8',
        text: 'message 1alskdjf;lksjd;fljas;l j;alsdf;lasf;ljs;lkasdf ;sd;laskdfl;asjdf;lasd;fas;dlfalsdkjf asdf asdf lqwej sdfo sadfkn laksjb lkjasbf, lklk lbk kjbk j--------------->>',
        sender: 'Koushik',
    },
]

ReactDOM.render(
    <App />,
    document.getElementById('app')
)