import { Type } from '../../constants';
import register, { unRegister } from './Register';
import Broadcaster from './Broadcaster';

var messageCounterHigh = 0;
var messageCounterLow = 0;

function idGenerator() {
    if (messageCounterLow === Math.MAX_SAFE_INTEGER) {
        if (messageCounterHigh === Math.MAX_SAFE_INTEGER) {
            messageCounterHigh = 0;
            messageCounterLow = 0;
        }
        messageCounterHigh++;
    }
    messageCounterLow++;
    return `CHATTER-${messageCounterHigh}-${messageCounterLow}`;
}

export default function Worker(server) {
    const broadcaster = new Broadcaster(server);
    return (message, socket) => {
        if (!message) return false;
        switch (message.type) {
            case Type.Register:
                register(message, socket);
                break;
            case Type.UnRegister:
                unRegister(socket);
                break;
            case Type.Broadcast:
                const id = idGenerator()
                if (!broadcaster.broadcast(id, message)) {
                    socket.send(Broadcaster.failureMessage('Contains swear'))
                }
                break;
            case Type.Delete:
                if (!broadcaster.broadcast(message.payload, message)) {
                    socket.send(Broadcaster.failureMessage('Failed to delete'))
                }
                break;
        }
    }
}
