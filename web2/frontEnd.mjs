var disconnected_overlay;

document.addEventListener('DOMContentLoaded', () => {
    disconnected_overlay = document.querySelector('.disconnected');
});

function setConnected(boolean) {
    disconnected_overlay.classList.toggle('hidden', boolean);
}

var options = {
    animation: { duration: 0 }, scales: {
        y: {
            min: 0,
            max: 5,
            ticks: {
                stepSize: 0.5
            }
        }
    }
};
var chart1 = new Chart("canvas_priza1", {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: localStorage.getItem('priza1') || 'Aparat 1',
            data: [],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }]
    },
    options: options
});
var chart2 = new Chart("canvas_priza2", {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: localStorage.getItem('priza2') || 'Aparat 2',
            data: [],
            borderColor: 'rgb(201, 52, 235)',
            backgroundColor: 'rgba(201, 52, 235, 0.5)',
        }]
    },
    options: options
});
var chart3 = new Chart("canvas_priza3", {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: localStorage.getItem('priza3') || 'Aparat 3',
            data: [],
            borderColor: 'rgb(0, 255, 0)',
            backgroundColor: 'rgba(0, 255, 0, 0.5)',
        }]
    },
    options: options
});
var charts = [chart1, chart2, chart3];

function updateChart(chartNo, values) {
    let chart = charts[chartNo - 1];
    chart.data.labels = values.map(entry => {
        return entry[0];
    });

    chart.data.datasets[table - 1].data = values.map(entry => entry[1]);
    chart.update();
}

function toggleChart(val) {
    // make all charts displayed as none
    // document.querySelectorAll('.chart').forEach(chart => {
    // document.querySelector('.chart').style.top = val ? '0' : '100%';
}

export { setConnected, updateChart, toggleChart }