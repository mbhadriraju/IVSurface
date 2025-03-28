import "./components.css";
import { useState } from 'react';

function Sidebar(props) {
    const [asset, setAsset] = useState();
    const [strikeMin, setStrikeMin] = useState();
    const [strikeMax, setStrikeMax] = useState();
    const [timeMin, setTimeMin] = useState();
    const [timeMax, setTimeMax] = useState();

    function exportData() {
        const send_data = {
            "asset": asset,
            "strikeMin": strikeMin,
            "strikeMax": strikeMax,
            "timeMin": timeMin,
            "timeMax": timeMax
        };
        
        const backendUrl = 'http://localhost:5000/data';
        fetch(backendUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(send_data)
        })
        .then(response => {
            console.log("Data Sent");
            return response.json();
        })
        .then(get_data => {
            if (get_data.status === 'error') {
                alert(get_data.issue);
            }
        })
        .catch((error) => {
            alert('Network Error, unable to send');
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
            <button onClick={exportData}>Enter</button>
        </div>
    )
}

export default Sidebar;