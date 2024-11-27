// Footer en común para todo el sitio web
import { Link } from 'react-router-dom';
import { useUser } from '../../UserContext.jsx';
import './Footer.css';

function Footer() {
    const [user] = useUser();

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // Desplazamiento suave
        });
    };

    return (
        <footer>
            <div id="footerContentAll">
                <div className="footerContent">
                    <h5>Tu cuenta</h5>
                    {user.token ? (
                        // Si el usuario está logado, muestra el link al perfil
                        <Link to="/user/profile">Tu perfil</Link>
                    ) : (
                        // Si el usuario no está logado, muestra el link al login
                        <Link to="/user/login">Iniciar sesión</Link>
                    )}
                    <p>Ajustes</p>
                </div>

                <div className="footerContent">
                    <h5>Conócenos</h5>

                    <a
                        href={
                            'https://www.linkedin.com/in/sergio-manzano-esclapez/'
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Sergio
                    </a>
                    <a
                        href={
                            'https://www.linkedin.com/in/jonathanmendezromanelli/'
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Jonathan
                    </a>
                    <a
                        href={
                            'https://www.linkedin.com/in/paulafernandezrivera/'
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Paula
                    </a>
                    <a
                        href={'https://www.linkedin.com/in/diegoivan/'}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Diego
                    </a>
                </div>

                <div className="footerLogo">
                    <Link to="/">
                        <img src="/logotipo.webp" alt="logotipo de la web" />
                    </Link>
                    <p>©2024 OurMeet</p>
                </div>
            </div>

            <div
                className="flechaAbajo"
                id="flechaFooter1"
                onClick={scrollToTop}
            >
                <img
                    src="/interface/flechaArribaBlanco.webp"
                    alt="flecha arriba"
                />
            </div>
            <div
                className="flechaAbajo"
                id="flechaFooter2"
                onClick={scrollToTop}
            >
                <img
                    src="/interface/flechaArribaBlanco.webp"
                    alt="flecha arriba"
                />
            </div>
            <div
                className="flechaAbajo"
                id="flechaFooter3"
                onClick={scrollToTop}
            >
                <img
                    src="/interface/flechaArribaBlanco.webp"
                    alt="flecha arriba"
                />
            </div>

            <div
                className="flechaAbajo"
                id="flechaFooter4"
                onClick={scrollToTop}
            >
                <img
                    src="/interface/flechaArribaBlanco.webp"
                    alt="flecha arriba"
                />
            </div>
            <div
                className="flechaAbajo"
                id="flechaFooter5"
                onClick={scrollToTop}
            >
                <img
                    src="/interface/flechaArribaBlanco.webp"
                    alt="flecha arriba"
                />
            </div>
            <div
                className="flechaAbajo"
                id="flechaFooter6"
                onClick={scrollToTop}
            >
                <img
                    src="/interface/flechaArribaBlanco.webp"
                    alt="flecha arriba"
                />
            </div>
        </footer>
    );
}

export default Footer;
