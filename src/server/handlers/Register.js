import { Type } from '../../constants';
var clientRegister = {};

export default function register(message, socket) {
    if (message) {
        const data = message.payload;
        if (clientRegister[data.username]) {
            socket.send(registerSuccess());
            console.log(`registered ${data.username} with socket id: ${socket.id}`, );
            return
        }
        clientRegister[data.username] = socket;
        console.log(`registered ${data.username} with socket id: ${socket.id}`, );
        socket.send(registerSuccess());
    }
}

export function unRegister(socket) {
    const client = Object.keys(clientRegister).find(client => clientRegister[client].id == socket.id);
    if (client) {
        clientRegister[client].close();
        delete clientRegister[client];
    }
}

const registerSuccess = () => JSON.stringify({
    type: Type.Register,
    payload: {
        success: true,
        message: 'Register successful',
    },
})

const registerFailure = () => JSON.stringify({
    type: Type.Register,
    payload: {
        success: false,
        message: 'client exits',
    },
})
