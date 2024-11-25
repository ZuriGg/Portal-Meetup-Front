// Header condicional según si el usuario está registrado o no, accederá al token y mostrara un header u otro en cuestión del tipo de usuario que sea (Anónimo o Normal)
import { Link } from 'react-router-dom';
import LogoUser from './LogoUser.jsx';
import Filters from './Filters.jsx';
import SortFilter from './SortFilter.jsx';

import './Header.css';

function Header() {
    const attendanceId = 1;
    return (
        <>
            <header>
                <Link to="/">
                    <img src="/logotipo.webp" alt="logotipo de la web" />
                </Link>
                <div>
                    <Link to="/meetup/edit">
                        <button>/meetup/edit</button>
                    </Link>
                    <Link to={`/meetup/${attendanceId}/votes`}>
                        <button>/meetup/{attendanceId}/votes</button>{' '}
                    </Link>
                    <Link to={`/votesMeetup`}>
                        <button>/votesMeetup</button>{' '}
                    </Link>
                </div>
                <Filters />
                <SortFilter />
                <LogoUser />
            </header>
        </>
    );
}

export default Header;
