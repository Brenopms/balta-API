'use strict';

const app = require('../src/app');
const http = require('http');
const debug = require('debug')('nodestr:server');

const port = normalizePort(process.env.PORT || '3000');

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`server running  on port ${port}`)
});
server.on('listening', onListening);

function normalizePort(val){
    const port = parseInt(val, 10);
    if(isNaN(port)){
        return val;
    }
    if (port >= 0){
        return port;
    }
    return false;
}   

function onListening(){
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe' + addr
        : 'port' + addr.port;
    debug(`listening on ${bind}`);
}