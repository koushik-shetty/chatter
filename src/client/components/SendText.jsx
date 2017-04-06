import React, { Component, PropTypes } from 'react';
import MessageStatus, { states } from '../components/MessageStatus.jsx';

import { Type } from '../../constants';

class SendText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            status: states.idle,
        };
        this._onChange = this._onChange.bind(this);
        this._onClick = this._onClick.bind(this);
    }

    _onChange(e) {
        this.setState({ text: e.target.value, status: states.idle });
    }

    _onClick() {
        if (this.state.text) {
            this.props.messenger.send({
                isDeleted: false,
                text: this.state.text
            }, Type.Broadcast);
            this.setState({ status: states.sending });
        }
    }

    render() {
        return (
            <div className="sendtext-container" >
                <MessageStatus
                    messenger={this.props.messenger}
                    status={this.state.status}
                    onSend={() => { this.setState({ status: states.idle })}}
                />
                <textarea
                    autoFocus
                    autoComplete="on"
                    className="sendtext"
                    maxLength={242}
                    placeholder="Type a message. Please no swearing :)"
                    type="text"
                    value={this.state.text}
                    onChange={this._onChange}
                />
                <div>
                    <button className="send-button" type="submit" onClick={this._onClick} >Send</button>
                </div>
            </div>
        );
    }
}

export default SendText;

SendText.propTypes = {
    messenger: PropTypes.object.isRequired,
};
