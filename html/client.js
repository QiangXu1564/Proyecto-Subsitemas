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

var serverdate;
socket.on('serverdate', function(data){
    serverdate = data;
});

//Actualización de cada gráfica
function dataairgap(label, dato) {
    if (airgap.data.labels.length >= 25) {
        airgap.data.labels.shift(); 
        airgap.data.datasets.forEach((dataset) => {
            dataset.data.shift(); 
        });
    }
    airgap.data.labels.push(label);
    airgap.data.datasets.forEach((dataset) => {
        dataset.data.push(dato);
    });
    airgap.update();
}

function dataspeed(label, dato) {
    if (speed.data.labels.length >= 25) {
        speed.data.labels.shift(); 
        speed.data.datasets.forEach((dataset) => {
            dataset.data.shift(); 
        });
    }
    speed.data.labels.push(label);
    speed.data.datasets.forEach((dataset) => {
        dataset.data.push(dato);
    });
    speed.update();
}

function datacurrent(label, dato) {
    if (current.data.labels.length >= 25) {
        current.data.labels.shift(); 
        current.data.datasets.forEach((dataset) => {
            dataset.data.shift(); 
        });
    }
    current.data.labels.push(label);
    current.data.datasets.forEach((dataset) => {
        dataset.data.push(dato);
    });
    current.update();
}

function datavoltage(label, dato) {
    if (voltage.data.labels.length >= 25) {
        voltage.data.labels.shift(); 
        voltage.data.datasets.forEach((dataset) => {
            dataset.data.shift(); 
        });
    }
    voltage.data.labels.push(label);
    voltage.data.datasets.forEach((dataset) => {
        dataset.data.push(dato);
    });
    voltage.update();
}

//Clasificación de cada valor
socket.on('dataclient', function(data){
    switch(data.nombre){
        case "airgap":
            airgapdata.innerHTML += `<p>[Value: ${data.valor} Timestamp: ${data.timestamp}]</p>`;
            dataairgap(data.timestamp, data.valor);
            socket.emit('received', (data));
            break;
        case "speed":
            speeddata.innerHTML += `<p>[Value: ${data.valor} Timestamp: ${data.timestamp}]</p>`;
            dataspeed(data.timestamp, data.valor);
            socket.emit('received', (data));
            break;
        case "current":
            currentdata.innerHTML += `<p>[Value: ${data.valor} Timestamp: ${data.timestamp}]</p>`;
            datacurrent(data.timestamp, data.valor);
            socket.emit('received', (data));
            break;
        case "voltage":
            voltagedata.innerHTML += `<p>[Value: ${data.valor} Timestamp: ${data.timestamp}]</p>`;  
            datavoltage(data.timestamp, data.valor);
            socket.emit('received', (data));
            break;
        default:
            socket.emit('error', data);
    }
});

//Gráficas
const airgap = new Chart(airgapcanvas, {
    type: "line",
    data: {
        datasets: [{
            borderColor: "#ED8A23", 
            data: []  
        }]
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
                    fontColor: "#003B4D",
                    fontSize: "13"
                }
            }],
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: "Centimeters",
                    fontColor: "#003B4D",
                    fontSize: "13"
                }
            }]
        },
        plugins: {
            zoom: {
                pan: {
                    enabled: true,
                    mode: 'x',
                    speed: 10,
                    threshold: 10
                },
                zoom: {
                    enabled: true,
                    mode: 'x',
                    speed: 0.1
                }
            }
        },
        elements: {
            line: {
                backgroundColor: 'rgba(0, 0, 0, 0)'
            }
        }
    }
});

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
                fontColor: "#003B4D",
                fontSize: "13"
              }
            }],
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: "Meters per second",
                fontColor: "#003B4D",
                fontSize: "13"
              }
            }]
        },
        plugins: {
            zoom: {
                pan: {
                    enabled: true
                }
            }
        },
        elements: {
            line: {
                backgroundColor: 'rgba(0, 0, 0, 0)'
            }
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
                fontColor: "#003B4D",
                fontSize: "13"
              }
            }],
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: "Amps",
                fontColor: "#003B4D",
                fontSize: "13"
              }
            }]
        },
        plugins: {
            zoom: {
                pan: {
                    enabled: true
                }
            }
        },
        elements: {
            line: {
                backgroundColor: 'rgba(0, 0, 0, 0)'
            }
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
                fontColor: "#003B4D",
                fontSize: "13"
              }
            }],
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: "Volts",
                fontColor: "#003B4D",
                fontSize: "13"
              }
            }]
        },
        plugins: {
            zoom: {
                pan: {
                    enabled: true
                }
            }
        },
        elements: {
            line: {
                backgroundColor: 'rgba(0, 0, 0, 0)'
            }
        }
    }
})
