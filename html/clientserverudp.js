const socket = io('http://localhost:8080');
const dgram = require("dgram");

const client = dgram.createSocket('udp4');

client.on('message', (msg, rinfo) => {
  console.log(`Datos recibidos desde ${rinfo.address}:${rinfo.port}`);
  const data = JSON.parse(msg);
  console.log('Mensaje recibido del servidor:', data);
  socket.emit('data', data);
});

client.on('error', (err) => {
  console.log(`Error en el cliente: ${err.stack}`);
});

client.bind(3000);