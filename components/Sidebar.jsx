import "./components.css";
import { useState } from 'react';
import Surface from './Surface.jsx';

function Sidebar() {
    const [asset, setAsset] = useState();
    const [strikeMin, setStrikeMin] = useState();
    const [strikeMax, setStrikeMax] = useState();
    const [timeMin, setTimeMin] = useState();
    const [timeMax, setTimeMax] = useState();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState();
    const [clicked, setClicked] = useState(false);

    async function exportData() {
        try {
            setClicked(true);
            setLoading(true);
            const send_data = {
                "asset": asset,
                "strikeMin": strikeMin,
                "strikeMax": strikeMax,
                "timeMin": timeMin,
                "timeMax": timeMax
            };

            const backendUrl = 'http://localhost:5000/data';
            const sendResponse = await fetch(backendUrl, {
                method: 'POST',
                
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                
                body: JSON.stringify(send_data)
            });
            if (!sendResponse.ok) {
                throw new Error("Failed to send data to backend");
            }
            const getData = await sendResponse.json();
            if (getData.status === "error") {
                throw new Error(getData.issue);
            }
            setData(getData);
        } catch (error) {
            console.error("Error:", error);
            alert(error);
        } finally {
            setLoading(false);  
            setClicked(false);
        }
    }

    return (
        <div>
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
                <button onClick={exportData} disabled={clicked}>
                    {loading ? 'Loading...' : 'Plot'}
                </button>
            </div>
            <div>
                <Surface plotData={data}/>
            </div>
        </div>
    )
}

export default Sidebar;