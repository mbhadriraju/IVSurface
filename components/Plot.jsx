import "./components.css";
import { useState } from 'react';
import { useEffect } from 'react';

function Plot(props) {
    const [data, setData] = useState([{}]);

    useEffect(() => {
        fetch("http://localhost:5000/members").then(
            res => res.json()
        ).then(
            data => {
                setData(data)
            }
         )
    }, []);



    return (
        <div className="plot">
        </div>
    )
}

export default Plot;