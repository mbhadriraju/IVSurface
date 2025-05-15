import './components.css';
import Navbar from './Navbar.jsx';

function Header() {
    return (
        <div className="header">
            <div>
                <h1>The Trading Hub</h1>
            </div>
            <Navbar />
        </div>
    );
}

export default Header;