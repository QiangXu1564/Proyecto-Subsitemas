const path = require('path');
const express = require('express');
const app = express();
const dgram = require('node:dgram');
const writeFile = require('jsonfile');

const client = dgram.createSocket('udp4');

app.set('port', process.env.PORT || 8080);
app.use(express.static(path.join(__dirname, 'html')));

let serverdate;
const server = app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
    serverdate = new Date();
    console.log('Fecha en el que se inicia el servidor:', serverdate)
});

const socketio = require('socket.io');
const io = socketio(server);

let arraydatos = new Array();
let n = 0;

const nombreArchivo = 'datos.json';
function guardarDatos(Datos, nombreArchivo) {
    writeFile.writeFile(nombreArchivo, Datos, { spaces: 2 });
}

//Conexión con el servidor udp
client.on('message', (msg, rinfo) => {
    console.log(`Datos recibidos desde ${rinfo.address}:${rinfo.port}`);
    const data = JSON.parse(msg);
    guardarDatos(arraydatos, nombreArchivo);
    let time = Math.floor(Math.abs(serverdate.getTime() - data.timestamp) / 1000);
    data.timestamp = time;
    console.log('Mensaje recibido del servidor:', data);
    io.emit('dataclient', data);
    arraydatos[n] = data;
    n++;
});
  
  
const PORT = 3000;
const SERVER_ADDRESS = 'localhost';
client.bind(PORT, SERVER_ADDRESS, () => {
    console.log(`Cliente UDP conectado y escuchando en el puerto ${PORT}`);
});

//Conexión con el cliente websocket
io.on('connection', (socket) => {
    console.log('New connection', socket.id);
    for(let i = 0; i < n; i++){
        socket.emit('dataclient', arraydatos[i]);
    }
    socket.emit('serverdate', serverdate.getTime());
})