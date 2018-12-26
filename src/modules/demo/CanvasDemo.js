import React, {Component} from 'react';

export default class extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const canvas1 = document.getElementById('canvasDemo1');
        const canvas2 = document.getElementById('canvasDemo2');
        if (!canvas1.getContext || !canvas2.getContext) {
            return
        }

        const ctx = canvas1.getContext('2d');
        ctx.fillStyle = "rgb(200,0,0)";
        //绘制矩形
        ctx.fillRect (10, 10, 55, 50);

        ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
        ctx.fillRect (30, 30, 55, 50);

        ctx.strokeRect(100, 100, 100, 100);
        ctx.strokeStyle = 'rgba(0, 0, 200, 0.5)';

        ctx.fillStyle = "rgba(0, 100, 200, 0.5)";
        ctx.fillRect (60, 60, 55, 50);

        const cty = canvas2.getContext('2d');
        cty.beginPath();
        cty.arc(50, 50, 40, 0, Math.PI / 2, false);
        cty.stroke();

        cty.beginPath();
        cty.arc(50, 50, 40, 0, Math.PI / 2, true);
        cty.stroke();
    }

    render() {
        return <div style={{display:'flex',flexWrap:'wrap',alignItems:'center',flexDirection:'column'}}>
            <canvas id='canvasDemo1' width='auto' height='auto'></canvas>
            <canvas id='canvasDemo2' width='auto' height='auto'></canvas>
        </div>
    }
}