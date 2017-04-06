import React, { Component, PropTypes } from 'react';
import { Type } from '../../constants';

class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editable: false,
            text: props.text,
        };
        this._onDoubleClick = this._onDoubleClick.bind(this);
        this._onEdit = this._onEdit.bind(this);
    }

    _onEdit(e) {
        if (e.which === 13) {
            if (this.input.value) {
                this.setState({ editable: false, text:  this.input.value || '' });
                this.props.messenger.send({
                    id: this.props.id,
                    isDeleted: false,
                    text: this.input.value,
                }, Type.Update);
            } else { 
                this.setState({ editable:false, text: this.state.text });
            }
        }
    }

    _onDoubleClick() {
        this.setState({ editable: true });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ text: nextProps.text });
    }

    renderEditable(own, textClass) {
        if (this.state.editable && this.props.showDelete) {
            return (
                <input ref={e => this.input = e} type="text" defaultValue={this.state.text} className="editable-message" onKeyUp={this._onEdit} />
            );
        }
        return (
            <div className={textClass + own} title={this.state.text} onDoubleClick={this._onDoubleClick}>{this.state.text}</div>
        );
    }

    render() {
        const own = this.props.showDelete ? '-own' : '';
        const textClass = this.props.isDeleted ? "message-text-deleted" : "message-text";
        return (
            <div className={"message-container" + own} >
                <div className={"message-sender" + own} >{this.props.sender}</div>
                {this.renderEditable(own, textClass)}
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