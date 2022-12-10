var disconnected_overlay;

document.addEventListener('DOMContentLoaded', () => {
    disconnected_overlay = document.querySelector('.disconnected');
});

function setConnected(boolean){
    // toggle class 'hidden' on the disconnected overlay
    disconnected_overlay.classList.toggle('hidden', boolean);
}

function updateChart(values){
    // console.log(values[0])
    var chart = new Chart("data_chart", {
        type: 'line',
        data: {
            labels: values.map(entry => {
                return entry[0];
                let date = entry[0];
                return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
            }),
            datasets: [{
                data: values.map(entry => entry[1]),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                // fill: true,
                // tension: 0.1,
                // pointRadius: 0,
            }]
        },
        options: {animation:{duration:0}}
    });
}

function toggleChart(val){
    document.querySelector('.chart').style.top = val ? '0' : '100%';
}

export { setConnected, updateChart, toggleChart }