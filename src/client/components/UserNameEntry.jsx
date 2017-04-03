import React, { Component, PropTypes } from 'react';

class UserNameEntry extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            username: '',
            error: false,
        }
        this._onChange = this._onChange.bind(this);
        this._onUsernameEntry = this._onUsernameEntry.bind(this);
    }

    _onUsernameEntry(username) {
        let error = true;
        if (username) {
            this.props.onUsernameEntry(username);
            error = false;
        }
        this.setState({ error });
    }

    _onChange(e) {
        console.log('key:', e.which, e.key, this.state.username, "/");
        let username = String(this.state.username);//copy
        if (e.key === 'Enter') {
            console.log('name:', username);
            this._onUsernameEntry(username);
            return
        } else if (e.key === 'Backspace') {
            username = username.substr(0, (username.length || 1) - 1);
        } else if (e.which > 49 && e.which < 127) {
            username += e.key;
        }
        this.setState({ username, error: false });
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
                <input autoFocus className="user-name" type="text" placeholder="Enter Username" onKeyDown={(e) => this._onChange(e)} />
                <div></div>
                <button className="send-button" onClick={() => this._onUsernameEntry(this.state.username)}>Login</button>
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