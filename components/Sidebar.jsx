import "./components.css";
import { useState } from 'react';

function Sidebar(props) {
    const [asset, setAsset] = useState();
    const [strikeMin, setStrikeMin] = useState();
    const [strikeMax, setStrikeMax] = useState();
    const [timeMin, setTimeMin] = useState();
    const [timeMax, setTimeMax] = useState();

    function exportData() {
        const data = {
            "asset": asset || "SPY",
            "strikeMin": strikeMin || "400",
            "strikeMax": strikeMax || "700",
            "timeMin": timeMin || "0",
            "timeMax": timeMax || "252"
        };

        console.log('Sending data to server:', data);
        
        // Use the full backend URL instead of a relative path
        const backendUrl = 'https://studious-yodel-g4475945qw4q2wx4w-5000.app.github.dev/receive_data';
        
        fetch(backendUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            console.log('Response status:', response.status);
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            alert('Data sent successfully!');
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Failed to send data.');
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