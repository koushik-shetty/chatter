import React, { Component } from 'react';

import Message from './Message.jsx';

class MessageList extends Component {
    _showDelete(sender) {
        return this.props.user === sender;
    }

    _onDelete(id) {
        this.props.onDelete(id);
    }

    render() {
        return (
            <div className="message-list" >
                {this.props.messages.map(message => {
                    return <Message
                        key={message.id}
                        id={message.id}
                        text={message.text}
                        sender={message.sender}
                        showDelete={this._showDelete(message.sender)}
                        onDelete={(id) => this._onDelete(id)}
                    />
                })}
            </div>
        );
    }
}

export default MessageList;