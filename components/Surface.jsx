import "./components.css";
import { useState } from 'react';
import { useEffect } from 'react';
import Plot from 'react-plotly.js'


function Surface(props) {
    if (props.plotData != undefined) {
        const data = [{
            x: props.plotData['X'],
            y: props.plotData['Y'],
            z: props.plotData['Z'],
            type: 'surface'
        }]
        const layout = {
            title: {text: 'Volatility Surface'},
            autosize: true,
        };
        return (
            <div className="plot" id="surface">
                <Plot data={data} layout={layout}/>
            </div> 
        );
    }
    else {
        return (
            <div className="plot" id="surface">
            </div>
        )
    }
}

export default Surface;