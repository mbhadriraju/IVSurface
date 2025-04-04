import "./components.css";
import { useState } from 'react';
import { useEffect } from 'react';


function Plot(props) {
    useEffect(() => {
        plotSurface(props.plotData);
    }, [props.plotData]);

    function plotSurface(data) {
        return;
    }
    return (
        <div className="plot" id="surface">
        </div>
    );
}

export default Plot;