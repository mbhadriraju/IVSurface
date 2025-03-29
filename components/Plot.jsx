import "./components.css";
import { useState } from 'react';
import { useEffect } from 'react';


function Plot(props) {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);

    return (
        <div className="plot">
        </div>
    );
}

export default Plot;