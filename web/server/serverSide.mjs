import { ReadlineParser, SerialPort } from'serialport'
import { EventEmitter } from 'events'
console.clear()

/////// VARIABILE //////// Begining

const PORT = 'COM6'

///////////////////////// Core

var incomingData = new EventEmitter();

incomingData.on('data', data => { // data is a JSON object
    console.log(data)
})

///////////////////////// Handling connectoin

const parser = new ReadlineParser();
var port = null;

setInterval(() => {
    if(port) return;
    console.log("Trying to open port...")
    SerialPort.list().then(ports => {
        let aux = ports.find(p => p.path == PORT)
        if(!aux || port) return;

        port = new SerialPort({ path: PORT, baudRate: 9600 })

        port.pipe(parser)
        port.on('open', () => {
            port.flush()
            console.log('Conectat!')
        })

        port.on('close', () => {
            console.log('Deconectat!')
            port = null;
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
