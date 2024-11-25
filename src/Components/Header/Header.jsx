// Header condicional según si el usuario está registrado o no, accederá al token y mostrara un header u otro en cuestión del tipo de usuario que sea (Anónimo o Normal)
import { Link } from 'react-router-dom';
import LogoUser from './LogoUser.jsx';
import Filters from './Filters.jsx';

import './Header.css';

function Header() {
    const attendanceId = 1;
    return (
        <>
            <header>
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
                    <Filters />
                    <LogoUser />
                </div>
                <div id="headerBottom">
                    {' '}
                    <h1>OurMeet</h1>
                    <h2>nuestro lugar de encuentro</h2>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Vel eos ab adipisci facilis amet eaque quas placeat
                        iusto deserunt alias optio illum, reiciendis omnis
                        tempora commodi repudiandae dolore provident
                        perferendis? Lorem ipsum dolor sit amet consectetur
                        adipisicing elit. Vel eos ab adipisci facilis amet eaque
                        quas placeat iusto deserunt alias optio illum,
                        reiciendis omnis tempora commodi repudiandae dolore
                        provident perferendis? Lorem ipsum dolor sit amet
                        consectetur adipisicing elit. Vel eos ab adipisci
                        facilis amet e
                    </p>
                </div>
            </header>
        </>
    );
}

export default Header;
