const dgram = require('dgram');

const server = dgram.createSocket('udp4');

function generardatos() {
    return {
        nombre: "airgap",
        valor: Math.floor(Math.random(5)*10/2) + 1,
        timestamp: Math.floor(Math.random(5)*10/2) + 1
    };
}

server.on('listening', () => {
    const address = server.address();
    console.log(`Servidor UDP corriendo en ${address.address}:${address.port}`);
});

server.on('error', (err) => {
    console.log(`Error en el servidor: ${err.stack}`);
    server.close();
});

setInterval(() => {
    const data = generardatos();
    const json = JSON.stringify(data);
    console.log(`Datos enviados: ${json}`)
    server.send(json, 0, json.length, 3000, 'localhost');
}, 1000);

server.bind(3000, 'localhost');