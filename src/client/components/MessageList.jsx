import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Message from './Message.jsx';

class MessageList extends Component {
    _showDelete(sender) {
        return this.props.user === sender;
    }

    _onDelete(id) {
        this.props.onDelete(id);
    }

    componentDidUpdate(prevProps, prevState) {
        const msglist = ReactDOM.findDOMNode(this.msgList)
        msglist.scrollTop = msglist.clientHeight;
    }
    

    render() {
        return (
            <div className="message-list" ref={e => this.msgList = e}>
                {this.props.messages.map(message => {
                    return <Message
                        key={message.id}
                        id={message.id}
                        text={message.payload.text}
                        isDeleted={message.payload.isDeleted}
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