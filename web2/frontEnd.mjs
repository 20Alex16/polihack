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
            label: 'Aparat',
            //label: localStorage.getItem('priza1') || 'Aparat 1',
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
            label: 'Aparat',
            // label: localStorage.getItem('priza2') || 'Aparat 2',
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
            label: 'Aparat',
            // label: localStorage.getItem('priza3') || 'Aparat 3',
            data: [],
            borderColor: 'rgb(0, 0, 255)',
            backgroundColor: 'rgba(0, 0, 255, 0.5)',
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

var chart_canvases = []
document.addEventListener('DOMContentLoaded', () => {
    chart_canvases.push(document.querySelector('#canvas_priza1'));
    chart_canvases.push(document.querySelector('#canvas_priza2'));
    chart_canvases.push(document.querySelector('#canvas_priza3'));

    let radioButtons = document.querySelectorAll("input[name='selectie']");
    radioButtons.forEach((radioButton, index) => {
        radioButton.addEventListener('change', () => {
            toggleChart(index + 1);
        });
    });
    toggleChart(1);
});

function toggleChart(val) {
    val--; // index from 0
    chart_canvases.forEach((canvas, index) =>{
        canvas.style.display = index == val ? 'inherit' : 'none';
    })
    if(val < chart_canvases.length)
        chart_canvases[val].style.display = 'inherit';
}

export { setConnected, updateChart, toggleChart }