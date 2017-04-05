import React, { Component } from 'react';
import { Type } from '../../constants';

class MessageStatus extends Component {
    constructor(props) {
        super(props);
        if (!props.messenger) {
            throw new String('messenger is required to track message status');
        }
        const cb = props.messenger.getMessageCb();
        this.state = {
            status: states.idle,
        };
        props.messenger.setMessageCb(this.onMessageWrapper(cb));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.status === states.sending) {
            this.setState({ status: states.sending });
        }
    }


    onMessageWrapper(cb) {
        return (data) => {
            cb(data);
            let status = states.idle;
            switch (data.type) {
                case Type.Broadcast:
                    status = states.sent;
                    break;
                case Type.Delete:
                    status = states.deleted;
                    break;
                case Type.Rejected:
                    status = states.rejected;
                    break;
                default:
                    status = states.idle;
            }
            this.setState({ status });
        };
    }

    render() {
        return (
            <div className="status-text" >
                {this.state.status}
            </div>
        );
    }
}

export const states = {
    sending: 'Sending Message...',
    sent: 'Message Sent',
    rejected: 'Message Rejected',
    deleted: 'Message Deleted',
    idle: ' ',
};

export default MessageStatus;