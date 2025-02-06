import "./components.css";
import { useState } from 'react';



function Sidebar(props) {
    const [asset, setAsset] = useState()
    const [strikeMin, setStrikeMin] = useState()
    const [strikeMax, setStrikeMax] = useState()
    const [timeMin, setTimeMin] = useState()
    const [timeMax, setTimeMax] = useState()

    function exportData() {
        return JSON.stringify({
            "asset": asset,
            "strikeMin": strikeMin,
            "strikeMax": strikeMax,
            "timeMin": timeMin,
            "timeMax": timeMax
        });
    }

    return (
        <div className="sidebar">
            <p>Asset:</p>
            <input onChange={e => setAsset(e.target.value)}></input>
            <p>Strike Price Minimum:</p>
            <input onChange={e => setStrikeMin(e.target.value)}></input>
            <p>Strike Price Maximum:</p>
            <input onChange={e => setStrikeMax(e.target.value)}></input>
            <p>Time to Expiry Minimum:</p>
            <input onChange={e => setTimeMin(e.target.value)}></input>
            <p>Time to Expiry Maximum:</p>
            <input onChange={e => setTimeMax(e.target.value)}></input>
            <button onClick={exportData()}>Enter</button>
        </div>
    )
}

export default Sidebar