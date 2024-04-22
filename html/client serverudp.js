const dgram = require('dgram');
const { emit } = require('process');

const client = dgram.createSocket('udp');

const serverPort = 8080; 
const serverAddress = '203.120.95.22'; 

let arrdatos = new Array();
let n = 0;

client.send(message, serverPort, serverAddress, (error) => {
    if (error) {
        console.error('Error al enviar mensaje:', error);
        client.close();
    }
    else {
        console.log('Mensaje enviado con éxito!');
    }
});

client.on('message', (msg) => {
    arrdatos = msg;
    n++;
    console.log('Mensaje recibido del servidor:', msg.toString());
    emit
});

client.on('close', () => {
    console.log('Cliente UDP cerrado');
});