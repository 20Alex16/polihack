var disconnected_overlay;

document.addEventListener('DOMContentLoaded', () => {
    disconnected_overlay = document.querySelector('.disconnected');
});

function setConnected(boolean){
    // toggle class 'hidden' on the disconnected overlay
    disconnected_overlay.classList.toggle('hidden', boolean);
}

// console.log(values[0])
var chart = new Chart("data_chart", {
type: 'line',
data: {
    labels: [
        // localStorage.getItem('priza1') || 'Aparat 1',
        // localStorage.getItem('priza2') || 'Aparat 2',
        // localStorage.getItem('priza3') || 'Aparat 3',
    ],
        // labels: values.map(entry => {
        //     return entry[0];
        //     let date = entry[0];
        //     return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        // }),
        datasets: [{
            label: localStorage.getItem('priza1') || 'Aparat 1',
            data: [],
            // data: values.map(entry => entry[1]),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }, {
            label: localStorage.getItem('priza2') || 'Aparat 2',
            data: [],
            // data: values.map(entry => entry[1]),
            borderColor: 'rgb(201, 52, 235)',
            backgroundColor: 'rgba(201, 52, 235, 0.5)',
        }, {
            label: localStorage.getItem('priza3') || 'Aparat 3',
            data: [],
            // data: values.map(entry => entry[1]),
            borderColor: 'rgb(28, 252, 110)',
            backgroundColor: 'rgba(28, 252, 110, 0.5)',
        }]
    },
    options: {animation:{duration:0}}
});

function updateChart(table,values){
    chart.data.labels = values.map(entry => {
        return entry[0];
    });

    chart.data.datasets[table-1].data = values.map(entry => entry[1]);
    chart.update();
}

function toggleChart(val){
    document.querySelector('.chart').style.top = val ? '0' : '100%';
}

export { setConnected, updateChart, toggleChart }