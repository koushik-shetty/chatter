import React, { Component, PropTypes } from 'react';

class UserNameEntry extends Component {
    render() {
        return (
            <div className="user-name-container" >
                <input className="user-name" type="text" placeholder="UserName" onChange={(e) => this.props.onChange(e)} />
                <div></div>
                <button className="send-button" >Login</button>
            </div>
        );
    }
}

export default UserNameEntry;

UserNameEntry.defaultProps = {
    onChange: () => {},
};

UserNameEntry.propTypes = {
    onChange: PropTypes.func,
};