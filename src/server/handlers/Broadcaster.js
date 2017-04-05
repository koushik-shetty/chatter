import { runAgainstValidators, validators } from './validators';
import { Type } from '../../constants';

export default class Broadcaster {
    constructor(server) {
        this.server = server;
        this.broadcast = this.broadcast.bind(this);
    }

    broadcast(id, message) {
        const isValid = runAgainstValidators(message, validators);
        if (isValid) {
            Object.keys(this.server.clients).forEach(client => {
                this.server.clients[client].send(broadcastFormat(id, message));
            });
            return true;
        }
        return false;
    }

    static failureMessage(reason) {
        return JSON.stringify({
            type: Type.Rejected,
            payload: reason,
        });
    }
}

function broadcastFormat(id, message) {
    return JSON.stringify({
        id,
        ...message,
    });
}