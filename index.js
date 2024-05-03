const path = require('path');
const express = require('express');
const app = express();

app.set('port', process.env.PORT || 8080);
app.use(express.static(path.join(__dirname, 'html')));

const server = app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});

const socketio = require('socket.io');
const io = socketio(server);

let arraydatos = new Array();
let n = 0;

io.on('connection', (socket) => {
    console.log('New connection', socket.id);
    for(let i = 0; i < n; i++){
        socket.emit('dataclient', arraydatos[i]);
    }
    socket.on('data', (data) =>{
        arraydatos[n] = data;
        n++;
        io.sockets.emit('dataclient', data);
    })
    socket.on('pruebaenvio', (data) => {
        arraydatos[n] = data;
        n++;
        io.sockets.emit('dataclient', data);
    })
    socket.on('error', (data) => {
        console.log("El dato: " + data + "no es un dato válido.")
    })
})