const socket = io()

let airgapcanvas = document.getElementById('airgap-canvas').getContext('2d');
let airgapdata = document.getElementById('airgap-data');
let speedcanvas = document.getElementById('speed-canvas').getContext('2d');
let speeddata = document.getElementById('speed-data');
let currentcanvas = document.getElementById('current-canvas').getContext('2d');
let currentdata = document.getElementById('current-data');
let voltagecanvas = document.getElementById('voltage-canvas').getContext('2d');
let voltagedata = document.getElementById('voltage-data');

let buttonprueba = document.getElementById('buttonprueba');

var arrairgap = new Array();
var nairgap = 0;

var arrspeed = new Array();
var nspeed = 0;

var arrcurrent = new Array();
var ncurrent = 0;

var arrvoltage = new Array();
var nvoltage = 0;

var n = 1;
buttonprueba.addEventListener('click', function(){
    const l = Math.floor(Math.random(5)*10/2) + 1;
    if(l == 1){
        socket.emit('pruebaenvio',{
            nombre: "airgap",
            valor: Math.floor(Math.random(5)*10/2) + 1,
            timestamp: n
        })
    }
    else if(l == 2){
        socket.emit('pruebaenvio',{
            nombre: "speed",
            valor: Math.floor(Math.random(5)*10/2) + 1,
            timestamp: n
        })
    }
    else if(l == 3){
        socket.emit('pruebaenvio',{
            nombre: "current",
            valor: Math.floor(Math.random(5)*10/2) + 1,
            timestamp: n
        })
    }
    else if(l == 4){
        socket.emit('pruebaenvio',{
            nombre: "voltage",
            valor: Math.floor(Math.random(5)*10/2) + 1,
            timestamp: n
        })
    }
    n++;
})

function dataairgap(label, dato) {
    airgap.data.labels.push(label);
    airgap.data.datasets.forEach((dataset) => {
        dataset.data.push(dato);
    });
    airgap.update();
}

function dataspeed(label, dato) {
    speed.data.labels.push(label);
    speed.data.datasets.forEach((dataset) => {
        dataset.data.push(dato);
    });
    speed.update();
}

function datacurrent(label, dato) {
    current.data.labels.push(label);
    current.data.datasets.forEach((dataset) => {
        dataset.data.push(dato);
    });
    current.update();
}

function datavoltage(label, dato) {
    voltage.data.labels.push(label);
    voltage.data.datasets.forEach((dataset) => {
        dataset.data.push(dato);
    });
    voltage.update();
}

socket.on('dataclient', function(data){
    switch(data.nombre){
        case "airgap":
            arrairgap[nairgap] = data;
            nairgap++;
            airgapdata.innerHTML += `<p>[Value: ${data.valor} Timestamp: ${data.timestamp}]</p>`;
            dataairgap(data.timestamp, data.valor);
            break;
        case "speed":
            arrspeed[nspeed] = data;
            nspeed++;
            speeddata.innerHTML += `<p>[Value: ${data.valor} Timestamp: ${data.timestamp}]</p>`;
            dataspeed(data.timestamp, data.valor);
            break;
        case "current":
            arrcurrent[ncurrent] = data;
            ncurrent++;
            currentdata.innerHTML += `<p>[Value: ${data.valor} Timestamp: ${data.timestamp}]</p>`;
            datacurrent(data.timestamp, data.valor);
            break;
        case "voltage":
            arrvoltage[nvoltage] = data;
            nvoltage++;
            voltagedata.innerHTML += `<p>[Value: ${data.valor} Timestamp: ${data.timestamp}]</p>`;  
            datavoltage(data.timestamp, data.valor);
            break;
        default:
            socket.emit('error', data);
    }
});

const airgap = new Chart(airgapcanvas, {
    type:"line",
    data:{
        datasets:[
            {
                backgroundcolor:"#ED8A23",
                borderColor:"#ED8A23",
                data: []  
            }
        ]
    },
    options: {
        legend: {
            display: false
        },
        tooltips: {
            callbacks: {
               label: function(tooltipItem) {
                      return tooltipItem.yLabel;
               }
            }
        },
        scales: {
            xAxes: [{
              scaleLabel: {
                display: true,
                labelString: "Time",
                fontColor: "orange"
              }
            }],
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: "Centimeters",
                fontColor: "orange"
              }
            }]
          }
    }
})

const speed = new Chart(speedcanvas, {
    type:"line",
    data:{
        datasets:[
            {
                backgroundcolor:"#ED8A23",
                borderColor:"#ED8A23",
                data: []  
            }
        ]
    },
    options: {
        legend: {
            display: false
        },
        tooltips: {
            callbacks: {
               label: function(tooltipItem) {
                      return tooltipItem.yLabel;
               }
            }
        },
        scales: {
            xAxes: [{
              scaleLabel: {
                display: true,
                labelString: "Time",
                fontColor: "orange"
              }
            }],
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: "Meters per second",
                fontColor: "orange"
              }
            }]
          }
    }
})

const current = new Chart(currentcanvas, {
    type:"line",
    data:{
        datasets:[
            {
                backgroundcolor:"#ED8A23",
                borderColor:"#ED8A23",
                data: []  
            }
        ]
    },
    options: {
        legend: {
            display: false
        },
        tooltips: {
            callbacks: {
               label: function(tooltipItem) {
                      return tooltipItem.yLabel;
               }
            }
        },
        scales: {
            xAxes: [{
              scaleLabel: {
                display: true,
                labelString: "Time",
                fontColor: "orange"
              }
            }],
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: "Amps",
                fontColor: "orange"
              }
            }]
          }
    }
})

const voltage = new Chart(voltagecanvas, {
    type:"line",
    data:{
        datasets:[
            {
                backgroundcolor:"#ED8A23",
                borderColor:"#ED8A23",
                data: []  
            }
        ]
    },
    options: {
        legend: {
            display: false
        },
        tooltips: {
            callbacks: {
               label: function(tooltipItem) {
                      return tooltipItem.yLabel;
               }
            }
        },
        scales: {
            xAxes: [{
              scaleLabel: {
                display: true,
                labelString: "Time",
                fontColor: "orange"
              }
            }],
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: "Volts",
                fontColor: "orange"
              }
            }]
          }
    }
})
