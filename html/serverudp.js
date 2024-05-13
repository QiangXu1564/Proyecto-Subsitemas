const dgram = require('dgram');

const server = dgram.createSocket('udp4');

//Generación de datos aleatorios
function generardatos1() {
    let now = new Date();
    return {
        nombre: "airgap",
        valor: Math.floor(Math.random()*10/2) + 1,
        timestamp: now.getTime()
    };
}
function generardatos2() {
    let now = new Date();
    return {
        nombre: "speed",
        valor: Math.floor(Math.random()*10/2) + 1,
        timestamp: now.getTime()
    };
}
function generardatos3() {
    let now = new Date();
    return {
        nombre: "current",
        valor: Math.floor(Math.random()*10/2) + 1,
        timestamp: now.getTime()
    };
}
function generardatos4() {
    let now = new Date();
    return {
        nombre: "voltage",
        valor: Math.floor(Math.random()*10/2) + 1,
        timestamp: now.getTime()
    };
}

server.on('listening', () => {
    const address = server.address();
    console.log(`Servidor UDP corriendo en ${address.address}:${address.port}`);
    //Envío de datos al servidor websocket
    setInterval(() => {
        const data1 = generardatos1();
        const data2 = generardatos2();
        const data3 = generardatos3();
        const data4 = generardatos4();
        const json1 = JSON.stringify(data1);
        const json2 = JSON.stringify(data2);
        const json3 = JSON.stringify(data3);
        const json4 = JSON.stringify(data4);
        console.log("\n")
        console.log(`Datos enviados: ${json1}`)
        console.log(`Datos enviados: ${json2}`)
        console.log(`Datos enviados: ${json3}`)
        console.log(`Datos enviados: ${json4}`)
        server.send(json1, 0, json1.length, 3000, 'localhost');
        server.send(json2, 0, json2.length, 3000, 'localhost');
        server.send(json3, 0, json3.length, 3000, 'localhost');
        server.send(json4, 0, json4.length, 3000, 'localhost');

    }, 1000);
});

server.on('error', (err) => {
    console.log(`Error en el servidor: ${err.stack}`);
    server.close();
});

const PORT = 3000;
server.bind(PORT, () => {
  console.log(`Servidor UDP escuchando en el puerto ${PORT}`);
});