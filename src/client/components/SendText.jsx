import React, { Component } from 'react';

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
        // { target: { value: text }, keycode }
        // console.log('onchange-', e.target.value, "--", e.keyCode);
        this.setState({ text: e.target.value });
    }

    _onClick() {
        if (this.state.text) {
            this.props.onSubmit(this.state.text);
        }
        // console.log('clicked');
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
                    onKeyPress={(e) => {console.log('ev', e.key, e.shiftKey)}}
                />
                <div>
                    <button className="send-button" type="submit" onClick={this._onClick} >Send</button>
                </div>
            </div>
        );
    }
}

export default SendText;