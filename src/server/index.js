/**
 * Server Entry File
 */

import express from 'express';
import engine from 'engine.io';

import Worker from './handlers/Worker';
import { Type } from '../constants';

process.chdir(__dirname)

const socketPort = process.env.SOCKETPORT || 8889;
const serverPort = process.env.SERVERPORT || 8888;

let exp = express()
    .use(express.static('./static'))
    .use(express.static('../static'))
    .get('*', (req, res) => {
        res.type('html').end(template('Hello'))
    });

let server = engine.listen(socketPort, undefined, () => { console.log(`socket listening at: ${socketPort}`) });
server.attach(exp);
const workerFunc = Worker(server);
server.on('connection', (socket) => {
    
    socket.on('message', (data) => {
        workerFunc(JSON.parse(data), socket);
    });

    socket.on('close', () => {
        workerFunc({ type: Type.UnRegister }, socket)
    });
});

exp.listen(serverPort, () => console.log(`App is listening on http://localhost:${serverPort}/`));



function template(body = '') {
    return `
<!DOCTYPE html>
<html>
<head>
    <title>Chatter</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="/normalize.css" rel="stylesheet">
    <link href="/main.css" rel="stylesheet">
    <link rel="icon" href="assests/login/img/favicon.ico" type="image/x-icon">
</head>
<body>
</body>
    <div id='app'>${body}</div>
    <script src="/client.js"></script>
</html>
`
}
