import React, { Component, PropTypes } from 'react';

class Message extends Component {
    render() {
        const own = this.props.showDelete ? '-own' : '';
        return (
            <div className={"message-container" + own} >
                <div className={"message-sender" + own} >{this.props.sender}</div>
                <div className={"message-text" + own} title={this.props.text} >{this.props.text}</div>
                {(() => {
                    if (this.props.showDelete) {
                        return (
                            <div className="message-delete" onClick={() => this.props.onDelete(this.props.id)} >
                                &#10006;
                            </div>
                        );
                    }
                    return null;
                })()}
            </div>
        );
    }
}

export default Message;

Message.propTypes = {
    id: PropTypes.string.isRequired,
    sender: PropTypes.string.isRequired,
    text: PropTypes.string,
    showDelete: PropTypes.bool,
    onDelete: PropTypes.func,
};

Message.defaultProps = {
    text: '',
    showDelete: false,
    onDelete: () => { },
};