var socket = io("ws://192.168.4.85:3000", { transports : ['websocket'] });

class Queue {
    constructor() {
        this.queue = [];
    }
    
    enqueue(element) {
        this.queue.push(element);
        return this.queue;
    }

    dequeue() {
        return this.queue.shift();
    }

    peek() {
        return this.queue[0];
    }

    size() {
        return this.queue.length();
    }

    isEmpty() {
        return this.queue.length === 0;
    }

    print() {
        return this.queue;
    }
}

const tempQ = new Queue();
const humQ = new Queue();
const dateQ = new Queue();

const colors = JSC.getPalette('default');
const colorText = function(txt, colorIndex) {
  return '<span style="color:' + colors[colorIndex] + '"><b>' + txt + '</b></span>';
};
const titleText = colorText('Humedad', 0) + ' + ' + colorText('Temperatura', 1);

socket.on('temperatura', (temp, hum) => {
    console.log("temperatura " + temp);
    console.log("humedad " + hum);
    JSC.chart('chartDiv', { 
        debug: true, 
        type: 'gauge', 
        legend_visible: false, 
        chartArea_boxVisible: false, 
        annotations: [{
            label_text: '<span style="font-size: 35px; font-weight:bold;">TEMPERATURA</span>' ,
            position: 'bottom center'
        }],
        xAxis: { 
        scale: { range: [0, 1], invert: true } 
        }, 
        palette: { 
        pointValue: '%yValue', 
        ranges: [ 
            { value: [10, 20], color: '#9BE5FE' }, 
            { value: [20, 25], color: '#6CE69A' }, 
            { value: [25, 35], color: '#FF7B68' }
        ] 
        }, 
        yAxis: { 
        defaultTick: { padding: 13, enabled: false }, 
        customTicks: [20, 25], 
        line: { 
        width: 15, 
        breaks_gap: 0.03, 
        color: 'smartPalette'
        }, 
        scale: { range: [10, 35] } 
        }, 
        defaultSeries: { 
        opacity: 1, 
        shape: { 
        label: { 
            align: 'center', 
            verticalAlign: 'middle'
        } 
        } 
        }, 
        series: [ 
        { 
        type: 'marker', 
        name: 'Score', 
        shape_label: { 
            text: temp + "", 
            style: { fontSize: 48 } 
        }, 
        defaultPoint: { 
            tooltip: '%yValue', 
            marker: { 
            outline: { 
                width: 10, 
                color: 'currentColor'
            }, 
            fill: 'white', 
            type: 'circle', 
            visible: true, 
            size: 30
            } 
        }, 
        points: [[1, temp]] 
        } 
        ] 
        });     
    
    JSC.chart('chartDiv2', { 
        debug: true, 
        type: 'gauge ', 
        legend_visible: false, 
        chartArea_boxVisible: false, 
        annotations: [{
            label_text: '<span style="font-size: 35px; font-weight:bold;">HUMEDAD</span>' ,
            position: 'bottom center'
        }],
        xAxis: { 
        scale: { range: [0, 1], invert: true } 
        }, 
        palette: { 
        pointValue: '%yValue', 
        ranges: [ 
            { value: [0, 33], color: '#77E6B4' }, 
            { value: [33, 66], color: '#FFD221' }, 
            { value: [66, 100], color: '#FF5353' }
        ] 
        }, 
        yAxis: { 
        defaultTick: { padding: 13, enabled: false }, 
        customTicks: [33, 66], 
        line: { 
        width: 15, 
        breaks_gap: 0.03, 
        color: 'smartPalette'
        }, 
        scale: { range: [0, 100] } 
        }, 
        defaultSeries: { 
        opacity: 1, 
        shape: { 
        label: { 
            align: 'center', 
            verticalAlign: 'middle'
        } 
        } 
        }, 
        series: [ 
        { 
        type: 'marker', 
        name: 'Score', 
        shape_label: { 
            text: hum + "", 
            style: { fontSize: 48 } 
        }, 
        defaultPoint: { 
            tooltip: '%yValue', 
            marker: { 
            outline: { 
                width: 10, 
                color: 'currentColor'
            }, 
            fill: 'white', 
            type: 'circle', 
            visible: true, 
            size: 30 
            } 
        }, 
        points: [[1, hum]] 
        } 
        ] 
        }); 

        var now = new Date().toISOString();
        dateQ.enqueue(now);
        humQ.enqueue(hum);
        tempQ.enqueue(temp);
        dateQ.dequeue();
        humQ.dequeue();
        tempQ.dequeue();

        JSC.chart('chartBar', {
            debug: true,
            type: 'area',
            title_label_text: titleText,
            legend_visible: false,
            yAxis: { formatString: '', scale_type: '' },
            xAxis: { crosshair_enabled: true, scale: { type: 'time' } },
            defaultSeries: {
                shape: {
                opacity: 0.6,
                fill: ['lightenMore', '#f1f1f1', 90]
                },
                defaultPoint_marker: {
                fill: 'white',
                type: 'circle',
                outline: { width: 3 }
                }
            },
            series: [
                {
                name: 'Humedad',
                points: [
                    [dateQ.print()[0], humQ.print()[0]],
                    [dateQ.print()[1], humQ.print()[1]],
                    [dateQ.print()[2], humQ.print()[2]],
                    [dateQ.print()[3], humQ.print()[3]],
                    [dateQ.print()[4], humQ.print()[4]],
                    [dateQ.print()[5], humQ.print()[5]],
                    [dateQ.print()[6], humQ.print()[6]],
                    [dateQ.print()[7], humQ.print()[7]],
                    [dateQ.print()[8], humQ.print()[8]],
                    [dateQ.print()[9], humQ.print()[9]],
                    [dateQ.print()[10], humQ.print()[10]],
                    [dateQ.print()[11], humQ.print()[11]],
                    [dateQ.print()[12], humQ.print()[12]],
                    [dateQ.print()[13], humQ.print()[13]],
                    [dateQ.print()[14], humQ.print()[14]],
                    [dateQ.print()[15], humQ.print()[15]],
                    [dateQ.print()[16], humQ.print()[16]],
                    [dateQ.print()[17], humQ.print()[17]],
                    [dateQ.print()[18], humQ.print()[18]],
                    [dateQ.print()[19], humQ.print()[19]]
                ]
                },
                {
                name: 'Temperatura',
                points: [
                    [dateQ.print()[0], tempQ.print()[0]],
                    [dateQ.print()[1], tempQ.print()[1]],
                    [dateQ.print()[2], tempQ.print()[2]],
                    [dateQ.print()[3], tempQ.print()[3]],
                    [dateQ.print()[4], tempQ.print()[4]],
                    [dateQ.print()[5], tempQ.print()[5]],
                    [dateQ.print()[6], tempQ.print()[6]],
                    [dateQ.print()[7], tempQ.print()[7]],
                    [dateQ.print()[8], tempQ.print()[8]],
                    [dateQ.print()[9], tempQ.print()[9]],
                    [dateQ.print()[10], tempQ.print()[10]],
                    [dateQ.print()[11], tempQ.print()[11]],
                    [dateQ.print()[12], tempQ.print()[12]],
                    [dateQ.print()[13], tempQ.print()[13]],
                    [dateQ.print()[14], tempQ.print()[14]],
                    [dateQ.print()[15], tempQ.print()[15]],
                    [dateQ.print()[16], tempQ.print()[16]],
                    [dateQ.print()[17], tempQ.print()[17]],
                    [dateQ.print()[18], tempQ.print()[18]],
                    [dateQ.print()[19], tempQ.print()[19]]
                ]
                }
            ]
            });
    });

JSC.chart('chartDiv', { 
    debug: true, 
    type: 'gauge ', 
    legend_visible: false, 
    chartArea_boxVisible: false, 
    annotations: [{
        label_text: '<span style="font-size: 35px; font-weight:bold;">TEMPERATURA</span>' ,
        position: 'bottom center'
    }],
    xAxis: { 
    scale: { range: [0, 1], invert: true } 
    }, 
    palette: { 
    pointValue: '%yValue', 
    ranges: [ 
        { value: [10, 20], color: '#9BE5FE' }, 
        { value: [20, 25], color: '#6CE69A' }, 
        { value: [25, 35], color: '#FF7B68' }
    ] 
    }, 
    yAxis: { 
    defaultTick: { padding: 13, enabled: false }, 
    customTicks: [20, 25], 
    line: { 
    width: 15, 
    breaks_gap: 0.03, 
    color: 'smartPalette'
    }, 
    scale: { range: [10, 35] } 
    }, 
    defaultSeries: { 
    opacity: 1, 
    shape: { 
    label: { 
        align: 'center', 
        verticalAlign: 'middle'
    } 
    } 
    }, 
    series: [ 
    { 
    type: 'marker', 
    name: 'Score', 
    shape_label: { 
        text: "", 
        style: { fontSize: 48 } 
    }, 
    defaultPoint: { 
        tooltip: '%yValue', 
        marker: { 
        outline: { 
            width: 10, 
            color: 'currentColor'
        }, 
        fill: 'white', 
        type: 'circle', 
        visible: true, 
        size: 30
        } 
    }, 
    points: [[1, 10]] 
    } 
    ] 
    });     

JSC.chart('chartDiv2', { 
    debug: true, 
    type: 'gauge ', 
    legend_visible: false, 
    chartArea_boxVisible: false, 
    annotations: [{
        label_text: '<span style="font-size: 35px; font-weight:bold;">HUMEDAD</span>' ,
        position: 'bottom center'
    }],
    xAxis: { 
    scale: { range: [0, 1], invert: true } 
    }, 
    palette: { 
    pointValue: '%yValue', 
    ranges: [ 
        { value: [0, 33], color: '#77E6B4' }, 
        { value: [33, 66], color: '#FFD221' }, 
        { value: [66, 100], color: '#FF5353' }
    ] 
    }, 
    yAxis: { 
    defaultTick: { padding: 13, enabled: false }, 
    customTicks: [33, 66], 
    line: { 
    width: 15, 
    breaks_gap: 0.03, 
    color: 'smartPalette'
    }, 
    scale: { range: [0, 100] } 
    }, 
    defaultSeries: { 
    opacity: 1, 
    shape: { 
    label: { 
        align: 'center', 
        verticalAlign: 'middle'
    } 
    } 
    }, 
    series: [ 
    { 
    type: 'marker', 
    name: 'Score', 
    shape_label: { 
        text: "", 
        style: { fontSize: 48 } 
    }, 
    defaultPoint: { 
        tooltip: '%yValue', 
        marker: { 
        outline: { 
            width: 10, 
            color: 'currentColor'
        }, 
        fill: 'white', 
        type: 'circle', 
        visible: true, 
        size: 30 
        } 
    }, 
    points: [[1, 0]] 
    } 
    ] 
}); 

temps.forEach(temp => {
    tempQ.enqueue(temp.temperatura);
    humQ.enqueue(temp.humedad);
    dateQ.enqueue(temp.fecha);
});

tempQ.print().reverse();
humQ.print().reverse();
dateQ.print().reverse();

JSC.chart('chartBar', {
debug: true,
type: 'area',
title_label_text: titleText,
legend_visible: false,
yAxis: { formatString: '', scale_type: '' },
xAxis: { crosshair_enabled: true, scale: { type: 'time' } },
defaultSeries: {
    shape: {
    opacity: 0.6,
    fill: ['lightenMore', '#f1f1f1', 90]
    },
    defaultPoint_marker: {
    fill: 'white',
    type: 'circle',
    outline: { width: 3 }
    }
},
series: [
    {
    name: 'Humedad',
    points: [
        [dateQ.print()[0], humQ.print()[0]],
        [dateQ.print()[1], humQ.print()[1]],
        [dateQ.print()[2], humQ.print()[2]],
        [dateQ.print()[3], humQ.print()[3]],
        [dateQ.print()[4], humQ.print()[4]],
        [dateQ.print()[5], humQ.print()[5]],
        [dateQ.print()[6], humQ.print()[6]],
        [dateQ.print()[7], humQ.print()[7]],
        [dateQ.print()[8], humQ.print()[8]],
        [dateQ.print()[9], humQ.print()[9]],
        [dateQ.print()[10], humQ.print()[10]],
        [dateQ.print()[11], humQ.print()[11]],
        [dateQ.print()[12], humQ.print()[12]],
        [dateQ.print()[13], humQ.print()[13]],
        [dateQ.print()[14], humQ.print()[14]],
        [dateQ.print()[15], humQ.print()[15]],
        [dateQ.print()[16], humQ.print()[16]],
        [dateQ.print()[17], humQ.print()[17]],
        [dateQ.print()[18], humQ.print()[18]],
        [dateQ.print()[19], humQ.print()[19]]
    ]
    },
    {
    name: 'Temperatura',
    points: [
        [dateQ.print()[0], tempQ.print()[0]],
        [dateQ.print()[1], tempQ.print()[1]],
        [dateQ.print()[2], tempQ.print()[2]],
        [dateQ.print()[3], tempQ.print()[3]],
        [dateQ.print()[4], tempQ.print()[4]],
        [dateQ.print()[5], tempQ.print()[5]],
        [dateQ.print()[6], tempQ.print()[6]],
        [dateQ.print()[7], tempQ.print()[7]],
        [dateQ.print()[8], tempQ.print()[8]],
        [dateQ.print()[9], tempQ.print()[9]],
        [dateQ.print()[10], tempQ.print()[10]],
        [dateQ.print()[11], tempQ.print()[11]],
        [dateQ.print()[12], tempQ.print()[12]],
        [dateQ.print()[13], tempQ.print()[13]],
        [dateQ.print()[14], tempQ.print()[14]],
        [dateQ.print()[15], tempQ.print()[15]],
        [dateQ.print()[16], tempQ.print()[16]],
        [dateQ.print()[17], tempQ.print()[17]],
        [dateQ.print()[18], tempQ.print()[18]],
        [dateQ.print()[19], tempQ.print()[19]]
    ]
    }
]
});



