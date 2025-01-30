import "./components.css";

function Sidebar(props) {
    return (
        <div className="sidebar">
            <p>Asset:</p>
            <textarea></textarea>
            <p>Strike Price Minimum:</p>
            <textarea></textarea>
            <p>Strike Price Maximum:</p>
            <textarea></textarea>
            <p>Time to Expiry Minimum:</p>
            <textarea></textarea>
            <p>Time to Expiry Maximum:</p>
            <textarea></textarea>
            <button>Enter</button>
        </div>
    )
}

export default Sidebar