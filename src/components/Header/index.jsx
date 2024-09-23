import { Link } from 'react-router-dom';
import './styles.scss';

export default function Header() {
    return (
        <div className='header-container'>
            <h1>Student Stats</h1>
            <nav>
                <Link to='/login'>Logout</Link>
            </nav>
        </div>
    );
}