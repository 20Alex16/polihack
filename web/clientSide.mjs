import * as FrontEnd from './frontEnd.mjs';
const ws = new WebSocket(`ws://${window.location.host}:8080`);
var incomingInfo = new EventTarget();

ws.onopen = () => {
    console.log("Connected!");
};

ws.onclose = () => {
    console.log("Disconnected!");
}

ws.onmessage = incoming => { // data is already a JSON object
    let data = JSON.parse(incoming.data);
    incomingInfo.dispatchEvent(new CustomEvent('data', { detail: data }));
    // console.log(data);
};

document.addEventListener('DOMContentLoaded', () => {
    const deviceContainer = document.querySelector('.devices');
    const deviceTemplate = document.getElementsByTagName('template')[0]
        .content.querySelector('.device');

    incomingInfo.addEventListener('data', event => {
        let data = event.detail;
        if(data.state){
            FrontEnd.setConnected(data.state == 'online');
            // alert(data.state);
            return;
        }
        // if there are no children, create them!
        if (deviceContainer.children.length == 0) {
            // console.log(data)
            for(const [device_name, device_value] of Object.entries(data)) {
                let device = deviceTemplate.cloneNode(true);
                device.id = device_name;
                device.querySelector('.device_name').textContent = "Aspirator";
                device.querySelector('.device_description').textContent = device_value;
                // device.querySelector('.device_id').textContent = d.id;
                deviceContainer.appendChild(device);
            }
        }
        else{ // update the data
            for(const [device_name, device_value] of Object.entries(data)) {
                let device = document.getElementById(device_name);
                device.querySelector('.device_description').textContent = device_value;
            }
        }

        // if (data.type == 'device') {
            // let device = deviceTemplate.cloneNode(true);
            // device.querySelector('.device-name').textContent = data.name;
            // device.querySelector('.device-id').textContent = data.id;
            // deviceContainer.appendChild(device);
        // }
    });
});