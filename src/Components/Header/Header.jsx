import { Link } from 'react-router-dom';
import LogoUser from './LogoUser.jsx';
import Filters from './Filters.jsx';
import { useLocation } from 'react-router-dom';

import './Header.css';

function Header() {
    const attendanceId = 1;
    const location = useLocation();
    const locationHome = location.pathname === '/';

    return (
        <>
            <header
                style={
                    locationHome
                        ? { minHeight: '100vh' }
                        : { minHeight: '20vh' }
                }
            >
                <div id="headerTop">
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
                    {locationHome ? <Filters /> : null}
                    <LogoUser />
                </div>
                {locationHome ? (
                    <div id="headerBottom">
                        <h1>OurMeet</h1>
                        <h2>nuestro lugar de encuentro</h2>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Vel eos ab adipisci facilis amet eaque quas
                            placeat iusto deserunt alias optio illum, reiciendis
                            omnis tempora commodi repudiandae dolore provident
                            perferendis? Lorem ipsum dolor sit amet consectetur
                            adipisicing elit. Vel eos ab adipisci facilis amet
                            eaque quas placeat iusto deserunt alias optio illum,
                            reiciendis omnis tempora commodi repudiandae dolore
                            provident perferendis? Lorem ipsum dolor sit amet
                            consectetur adipisicing elit. Vel eos ab adipisci
                            facilis amet e
                        </p>
                    </div>
                ) : null}
            </header>
        </>
    );
}

export default Header;
