import "./components.css";
import { useState, useEffect } from 'react';

function Sidebar(props) {
    const [asset, setAsset] = useState();
    const [strikeMin, setStrikeMin] = useState();
    const [strikeMax, setStrikeMax] = useState();
    const [timeMin, setTimeMin] = useState();
    const [timeMax, setTimeMax] = useState();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState();
    const [clicked, setClicked] = useState(false);

    function exportData() {
        setClicked(true);
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
            else {
                console.log(get_data);
            }
        })
        .catch((error) => {
            alert(error);
        });
    }

    const fetchData = async() => {
        await exportData();
        setLoading(true);
        fetch("http://localhost:5000/send")
        .then(response => {
            if (!response.ok) {
                alert("Unable to fetch data");
            }
            return response.json();
        })
        .then(responseData => {
                console.log("Data Received: ");
                console.log(responseData);
                setData(responseData);
                setLoading(false);
                setClicked(false);
        })
        .catch(error => {
            console.log(data);
            alert(error);
            setLoading(false);
            setClicked(false);
        })
    };

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
            <button onClick={fetchData} disabled={clicked}>
                {loading ? 'Loading...' : 'Plot'}
            </button>
        </div>
    )
}

export default Sidebar;