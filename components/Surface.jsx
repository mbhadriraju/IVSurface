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
            showscale: false,
            type: 'surface'
        }]
        const layout = {
            paper_bgcolor: 'rgba(0,0,0,0)',  
            plot_bgcolor: 'rgba(0,0,0,0)',  
            showlegend: false,
            autosize: true,
            scene: {
                xaxis: {title: {text: 'Time to Expiry'}},
                yaxis: {title: {text: 'Strike'}},
                zaxis: {title: {text: 'Volatility'}},
            },
            font: {
                color: 'white'
            }
        };

        const config = {
            displayModeBar: false,
            responsive: true,
            scrollZoom: true,
        };
        return (
            <div className="plot" id="surface">
                <Plot data={data} layout={layout} config={config} style={{width: "100%", height: "100%"}}/>
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