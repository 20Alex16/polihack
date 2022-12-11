var disconnected_overlay;

document.addEventListener('DOMContentLoaded', () => {
    disconnected_overlay = document.querySelector('.disconnected');
});

function setConnected(boolean) {
    disconnected_overlay.classList.toggle('hidden', boolean);
}

const minTreshold = 0.5, maxTreshold = 3.5;

var options = {
    animation: { duration: 0 },
    lines: [{
        value: minTreshold,
        color: 'yellow'
    },{
        value: maxTreshold,
        color: 'rgba(255,0,0,0.7)'
    }],
    scales: {
        yAxes: [{
                display: true,
                ticks: {
                    beginAtZero: true,
                    steps: 10,
                    stepValue: 1,
                    max: 5
                }
            }]
    }
};
Chart.pluginService.register({
    afterDraw: function(chart) {
        if (typeof chart.config.options.lines != 'undefined') {
           var lines = chart.config.options.lines;
            lines.forEach(entry => {
                let line = entry.value
                var ctxPlugin = chart.chart.ctx;
                var xAxe = chart.scales[chart.config.options.scales.xAxes[0].id];
                var yAxe = chart.scales[chart.config.options.scales.yAxes[0].id];
                if(yAxe.min != 0) return;
                ctxPlugin.strokeStyle = entry.color;
                ctxPlugin.beginPath();
                line = (line - yAxe.min) * (100 / yAxe.max);
                line = (100 - line) / 100 * (yAxe.height) + yAxe.top;
                ctxPlugin.lineWidth = 3;
                ctxPlugin.moveTo(xAxe.left, line);
                ctxPlugin.lineTo(xAxe.right, line);
                ctxPlugin.stroke();
            })
        }
    }
});
var chart1 = new Chart("canvas_priza1", {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Consum',
            //label: localStorage.getItem('priza1') || 'Aparat 1',
            data: [],
            borderColor: 'rgb(0, 255, 0)',
            backgroundColor: 'rgba(0, 255, 0, 0.2)',
        }]
    },
    options: options,
    annotation: {
        annotations: [{
          type: 'line',
          mode: 'horizontal',
          scaleID: 'y-axis-0',
          value: 2,
          borderColor: 'rgb(75, 192, 192)',
          borderWidth: 4,
          label: {
            enabled: false,
            content: 'Test label'
          }
        }]
      }
});
var chart2 = new Chart("canvas_priza2", {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Consum',
            // label: localStorage.getItem('priza2') || 'Aparat 2',
            data: [],
            borderColor: 'rgb(0, 255, 0)',
            backgroundColor: 'rgba(0, 255, 0, 0.2)',
        }]
    },
    options: options
});
var chart3 = new Chart("canvas_priza3", {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Consum',
            // label: localStorage.getItem('priza3') || 'Aparat 3',
            data: [],
            borderColor: 'rgb(0, 255, 0)',
            backgroundColor: 'rgba(0, 255, 0, 0.2)',
        }]
    },
    options: options
});
var charts = [chart1, chart2, chart3];

function updateChart(chartNo, values) {
    let chart = charts[chartNo - 1];
    chart.data.labels = values.map(entry => entry[0]);
    chart.data.datasets[0].data = values.map(entry => entry[1]);
    let last_value = values[values.length-1][1]
    chart.data.datasets[0].borderColor =
        (last_value < minTreshold ? 'purple' :
        (last_value > maxTreshold ? 'red' : 'green'))

    chart.data.datasets[0].backgroundColor =
        (last_value < minTreshold ? 'rgba(128, 0, 128, 0.5)' :
        (last_value > maxTreshold ? 'rgba(255, 0, 0, 0.5)' : 'rgba(0, 255, 0, 0.5)'))
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