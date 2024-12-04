import { Link } from 'react-router-dom';
import LogoUser from './LogoUser.jsx';

import { useLocation } from 'react-router-dom';

import './Header.css';
import { useEffect, useState } from 'react';

function Header() {
    const location = useLocation();
    const locationHome = location.pathname === '/';

    const [showFirstView, setShowFirstView] = useState(false);

    useEffect(() => {
        if (locationHome && !localStorage.getItem('firstView')) {
            setShowFirstView(true);
            localStorage.setItem('firstView', 'true'); // Guarda la clave después de mostrar
        }
    }, [locationHome]);

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
                    locationHome && showFirstView
                        ? { minHeight: '100vh' }
                        : {
                              minHeight: '20vh',
                              background: 'none',
                          }
                }
            >
                <div id="headerTop">
                    <Link to="/">
                        <img src="/logotipo.webp" alt="logotipo de la web" />
                    </Link>

                    <LogoUser />
                </div>
                {locationHome && showFirstView && (
                    <div id="headerBottom">
                        <h1>OurMeet</h1>
                        <h2>Nuestro lugar de encuentro</h2>
                        <p>
                            🎉 ¡Bienvenides! Este es un espacio para compartir
                            ideas, aprender y crecer juntes. 🌟 Tanto si eres
                            experte como si recién comienzas, aquí encontrarás
                            talleres, charlas inspiradoras y buena compañía. 🙌
                            ¡Únete y vive esta aventura! ✨
                        </p>
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
                    </div>
                )}
            </header>
        </>
    );
}

export default Header;
