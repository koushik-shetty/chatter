import React, { Component, PropTypes } from 'react';

import MessageFormater, { Messages } from '../models/Message';
import Messenger from '../models/messenger'
import { Type } from '../../constants';

class UserNameEntry extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            username: '',
            error: false,
        }
        this._onChange = this._onChange.bind(this);
        this._onUsernameEntry = this._onUsernameEntry.bind(this);
        this.onRegister = this.onRegister.bind(this);
    }

    _onUsernameEntry(username) {
        let error = true;
        if (username) {
            this._registerUser(username);
            error = false;
        }
        this.setState({ error });
    }

    onRegister(data) {
        if (data.type === Type.Register) {
            if (data.payload.success) {
                this.props.onUsernameEntry(this.messenger);
            } else {
                this.messenger.close();
                this.messenger = undefined;
            }
        }
    }

    _registerUser(username) {
        if (this.messenger) {
            this.messenger.close();
        }
        const messageFormater = new MessageFormater(username);
        this.messenger = new Messenger(messageFormater, this.onRegister);
        this.messenger.register();
    }

    _onChange(e) {
        if (this.input) {
            const value = this.input.value
            let error = true;
            if (value) {
                this._onUsernameEntry(value);
                error = false;
            }
            this.setState({ error });
        }
    }

    errorText() {
        if (this.state.error) {
            return (
                <div className="error-text" >* username required</div>
            );
        }
        return null;
    }

    render() {
        return (
            <div className="user-name-container" >
                <div className="chat-title" >Welcome to Chatter</div>
                {this.errorText()}
                <input autoFocus ref={(e) => this.input = e} className="user-name" type="text" placeholder="Enter Username" />
                <div></div>
                <button className="send-button" onClick={() => this._onChange()}>Login</button>
            </div>
        );
    }
}

export default UserNameEntry;

UserNameEntry.defaultProps = {
    onUsernameEntry: () => { },
};

UserNameEntry.propTypes = {
    onUsernameEntry: PropTypes.func,
};

const alphabets = "abcdefghijklmnopqrstuvwxyz";
const numbers = '0123456789';
const alphaArr = alphabets.split('');
const upperAlphaArr = alphabets.toUpperCase().split('');
const numberArr = numbers.split('');
const validCharsList = alphaArr.concat(...upperAlphaArr, ...numberArr)
function validChars(c) {
    if (validCharsList.find(vc => c === vc)) {
        return true;
    }
    return false;
}