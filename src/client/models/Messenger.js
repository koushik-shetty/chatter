import Message from './Message';
import engineClient from 'engine.io-client';
import { Type } from '../../constants';

export default class Messenger {
    constructor(message = new Message(''),  onMessageCb = () => { }, config = { port: 8889 }) {
        this.state = {
            active: false,
        };
        this.message = message;
        this.onMessageCb = onMessageCb;
        this._onMessage = this._onMessage.bind(this);
        this._setup(config);

    };

    _onMessage(data) {
        this.onMessageCb(JSON.parse(data));
    }

    _setup(config) {
        this.socket = engineClient(`ws://localhost:${config.port}`);
        this.socket.on('open', () => {
            this.state.active = true;
            this.socket.on('message', this._onMessage);
            this.socket.on('close', () => {
                this.state.active = false;
            });
            this.socket.on('error', (err) => {
                this.state.active = false;
                console.error('Socket error: ', err);
            });
        });
    }

    send(payload, type = Type.Broadcast) {
        if(this.state.active) {
            this.socket.send(JSON.stringify(this.message.format(payload, type)));
            return true;
        }
        return false;
    }

    close() {
        this.state.active = false;
        this.socket.close();
    }

    register() {
        this.socket.send(registerPayload(this.message.username));
    }

    setMessageCb(messageCb) {
        if (messageCb) {
            this.onMessageCb = messageCb;
        }
    }

    getUsername() {
        return this.message.getUsername();
    }

    getMessageFormatter() {
        return this.message;
    }
}

const registerPayload = (username) => JSON.stringify({
    type: Type.Register,
    payload: { username },
});
