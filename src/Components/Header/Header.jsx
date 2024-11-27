import { Link } from 'react-router-dom';
import LogoUser from './LogoUser.jsx';
import Filters from './Filters.jsx';
import { useLocation } from 'react-router-dom';
import SortFilter from './SortFilter.jsx';

import './Header.css';

function Header() {
    const attendanceId = 1;
    const location = useLocation();
    const locationHome = location.pathname === '/';

    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            const targetPosition =
                section.getBoundingClientRect().top + window.scrollY; // Cambiado a scrollY
            const startPosition = window.scrollY; // Cambiado a scrollY
            const distance = targetPosition - startPosition;
            const duration = 1000; // Duración en milisegundos
            let startTime = null;

            const animateScroll = (currentTime) => {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const run = easeInOutQuad(
                    timeElapsed,
                    startPosition,
                    distance,
                    duration
                );
                window.scrollTo(0, run);

                if (timeElapsed < duration)
                    requestAnimationFrame(animateScroll);
            };

            const easeInOutQuad = (t, b, c, d) => {
                t /= d / 2;
                if (t < 1) return (c / 2) * t * t + b;
                t--;
                return (-c / 2) * (t * (t - 2) - 1) + b;
            };

            requestAnimationFrame(animateScroll);
        }
    };

    return (
        <>
            <header
                style={
                    locationHome
                        ? { minHeight: '100vh' }
                        : { minHeight: '20vh', background: 'none' }
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
                    <SortFilter />
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

                <div
                    id="flechasDerecha"
                    className="flechasHeader"
                    onClick={() => scrollToSection('seccionObjetivo')}
                >
                    <div className="flechaAbajo">
                        <img
                            src="/interface/flechaAbajoBlanco.webp"
                            alt="flecha hacia abajo"
                        />
                    </div>
                    <div className="flechaAbajo">
                        <img
                            src="/interface/flechaAbajoBlanco.webp"
                            alt="flecha hacia abajo"
                        />
                    </div>
                    <div className="flechaAbajo">
                        <img
                            src="/interface/flechaAbajoBlanco.webp"
                            alt="flecha hacia abajo"
                        />
                    </div>
                </div>

                <div
                    id="flechasIzquierda"
                    className="flechasHeader"
                    onClick={() => scrollToSection('seccionObjetivo')}
                >
                    <div className="flechaAbajo">
                        <img
                            src="/interface/flechaAbajoBlanco.webp"
                            alt="flecha hacia abajo"
                        />
                    </div>
                    <div className="flechaAbajo">
                        <img
                            src="/interface/flechaAbajoBlanco.webp"
                            alt="flecha hacia abajo"
                        />
                    </div>
                    <div className="flechaAbajo">
                        <img
                            src="/interface/flechaAbajoBlanco.webp"
                            alt="flecha hacia abajo"
                        />
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;
