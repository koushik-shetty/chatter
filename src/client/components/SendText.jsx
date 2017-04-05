import React, { Component, PropTypes } from 'react';

import { Type } from '../../constants';

class SendText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
        };
        this._onChange = this._onChange.bind(this);
        this._onClick = this._onClick.bind(this);
    }

    _onChange(e) {
        this.setState({ text: e.target.value });
    }

    _onClick() {
        if (this.state.text) {
            this.props.messenger.send({
                isDeleted: false,
                text: this.state.text
            }, Type.Broadcast);
        }
    }

    render() {
        return (
            <div className="sendtext-container" >
                <textarea
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
