import { Type } from '../../constants';

export default class MessageFormater {
    constructor(username) {
        this.username = username;
        this.format = this.format.bind(this);
    }

    format(payload, type = Type.Broadcast) {
        return {
            type,
            payload,
            sender: this.username,
        };
    }

    getUsername() {
        return this.username;
    }
}


export class Messages {
    constructor(messageFormater, messages = []) {
        this.messages = messages;
        this.messageFormater = messageFormater;
    }

    add(msg) {
        if (msg) {
            this.messages.push(msg);
        }
        return this;
    }

    delete(id) {
        this.messages = this.messages.map(message => {
            if (message.id === id) {
                if (message.sender != this.messageFormater.getUsername()) {
                    return undefined;
                } else {
                    message.payload.isDeleted = true;
                    return message;
                }
            }
            return message;

        }).filter(message => message != undefined);
        return this;
    }

    get() {
        return this.messages;
    }
}