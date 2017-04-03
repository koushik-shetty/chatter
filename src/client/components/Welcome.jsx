import React, { Component } from 'react';

class Welcome extends Component {
    render() {
        if (this.props.username)
        return (
            <div className="welcome-message" >
                Hi! {this.props.username}
            </div>
        );
    }
}

export default Welcome;