import { ReadlineParser, SerialPort } from'serialport'
import { EventEmitter } from 'events'
import { WebSocketServer } from 'ws'
console.clear()

/////// VARIABILES /////// Begining

const PORT = 'COM6'

///////////////////////// Core

var wss = new WebSocketServer({ port: 8080, clientTracking: true })
var clients = [];
var isConnected = false;
var incomingData = new EventEmitter();

incomingData.on('data', data => { // data is a JSON object
    // console.log(data)
    clients.forEach(c => c.send(JSON.stringify(data))) // send data to all clients
})

function informAll(data){ // data is already a string
    clients.forEach(c => c.send(data))
}

function offline(){
    isConnected = false;
    informAll(JSON.stringify({state: 'offline'}))
}

function online(){
    isConnected = true;
    informAll(JSON.stringify({state: 'online'}))
}

wss.on('connection', ws => {
    console.log("Client conectat")
    clients.push(ws)
    ws.send(JSON.stringify({state: isConnected ? 'online' : 'offline'}))

    ws.on('close', () => {
        console.log("Client deconectat")
        clients = clients.filter(c => c != ws)
    })
})

///////////////////////// Handling connectoin

const parser = new ReadlineParser();
var port = null;

setInterval(() => {
    if(port) return;
    console.log("Conectare la arduino...")
    SerialPort.list().then(ports => {
        let aux = ports.find(p => p.path == PORT)
        if(!aux || port) return;

        port = new SerialPort({ path: PORT, baudRate: 9600 })
        
        port.pipe(parser)
        port.on('open', () => {
            port.flush()
            online();
            console.log('Conectat!')
        })

        port.on('close', () => {
            offline()
            port = null;
            console.log('Deconectat!')
        })

        parser.on('data', data => {
            try{
                incomingData.emit('data', JSON.parse(data))
                // dump corrupted data
            }
            catch (e){}
        })
    })
}, 1000);
