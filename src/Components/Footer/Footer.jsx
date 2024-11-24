import { Link } from 'react-router-dom';
// Footer en común para todo el sitio web
import './Footer.css';
import { useUser } from '../../UserContext.jsx';

function Footer() {
    const [user, , handleLogout] = useUser();

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
                    <Link to="/meetup/create">Crear meetup</Link>
                    <Link to="/" onClick={handleLogout}>
                        Cerrar Sesión
                    </Link>
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
        </footer>
    );
}

export default Footer;
