import { ReadlineParser, SerialPort } from'serialport'
console.clear()

/////// VARIABILE ////////

const PORT = 'COM6'

/////////////////////////

var port = new SerialPort({ path: PORT, baudRate: 9600 })
// console.log(port)


const parser = new ReadlineParser();

port.on('open', () => {
    port.pipe(parser)
    console.log('Conectat!')
})

port.on('close', () => {
    console.log('Deconectat!')
})

parser.on('data', data => {
    console.log(data)
})

setInterval(() => {
    if(!port.isOpen()){
        try{
            port.open()
        }
        catch(e){
            console.log("Could not open port!", e)
        }
    }
}, 100);

// SerialPort.list().then(ports => {
//     console.log(ports)
// })
