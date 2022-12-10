import * as FrontEnd from './frontEnd.mjs';
const ws = new WebSocket(`ws://${window.location.host}:8080`);
var incomingInfo = new EventTarget();

var values1 = [], values2 = [], values3 = [];
const maxValues = 15;
function addValue(which, val){
    // console.log(which, val)
    let now = new Date();
    switch(which){
        case '1':
            values1.push([`${now.getMinutes()}:${now.getSeconds()}`,val]);
            while(values1.length > maxValues) values1.shift();
            FrontEnd.updateChart(values1);
            break;

        case '2':
            values2.push([`${now.getMinutes()}:${now.getSeconds()}`,val]);
            while(values2.length > maxValues) values2.shift();
            FrontEnd.updateChart(values2);
            break;

        case '3':
            values3.push([`${now.getMinutes()}:${now.getSeconds()}`,val]);
            while(values3.length > maxValues) values3.shift();
            FrontEnd.updateChart(values3);
            break;
    }
}

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

    document.querySelector('.chart').addEventListener('click', event => {
        FrontEnd.toggleChart(false);
    });

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
                device.querySelector('.device-image').src = 'https://static.thenounproject.com/png/5044017-200.png';
                device.querySelector('.device-name').textContent = localStorage.getItem(device_name) || 'Aparat ' + device_name.slice(-1);
                device.querySelector('.expand-info').textContent = device_value.toFixed(1);
                deviceContainer.appendChild(device);
                // if button is pressed, toggle chart
                device.querySelector('.expand-info').addEventListener('click', event => {
                    FrontEnd.toggleChart(true);
                });
                // after user left .device-name, save the name in localStorage
                let name_element = device.querySelector('.device-name')
                name_element.addEventListener('blur', event => {
                    let text = name_element.textContent;
                    text = text.replace(/\n/g,' ');
                    text = text.slice(0, 15);
                    name_element.textContent = text;
                    localStorage.setItem(device_name, name_element.textContent);
                });
                addValue(device_name.slice(-1), device_value);
            }
        }
        else{ // update the data
            for(const [device_name, device_value] of Object.entries(data)) {
                let device = document.getElementById(device_name);
                device.querySelector('.expand-info').textContent = device_value.toFixed(1);
                addValue(device_name.slice(-1), device_value);
            }
        }
    });
});