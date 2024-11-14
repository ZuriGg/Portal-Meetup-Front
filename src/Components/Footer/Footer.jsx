import { Link } from 'react-router-dom';
// Footer en común para todo el sitio web
import './Footer.css';
import { useUser } from '../../UserContext.jsx';

function Footer() {
    const [user] = useUser();

    return (
        <footer>
            <nav id="container-footer">
                <h3>Tu cuenta</h3>
                {user.token ? (
                    // Si el usuario está logado, muestra el link al perfil
                    <Link to="/users">Tu perfil</Link>
                ) : (
                    // Si el usuario no está logado, muestra el link al login
                    <Link to="/users/login">Iniciar sesión</Link>
                )}

                <h3>
                    <Link to="/meetups">Meet ups</Link>{' '}
                </h3>
                <div>
                    <Link
                        to={`/categories/${encodeURIComponent(
                            'Viajes y aire libre'
                        )}`}
                    >
                        Viajes y aire libre
                    </Link>
                    <Link
                        to={`/categories/${encodeURIComponent(
                            'Actividades sociales'
                        )}`}
                    >
                        Actividades sociales
                    </Link>
                    <Link
                        to={`/categories/${encodeURIComponent(
                            'Aficiones y pasiones'
                        )}`}
                    >
                        Aficiones y pasiones
                    </Link>
                    <Link
                        to={`/categories/${encodeURIComponent(
                            'Deportes y fitness'
                        )}`}
                    >
                        Deportes y fitness
                    </Link>
                    <Link
                        to={`"/categories/${encodeURIComponent(
                            'Salud y bienestar'
                        )}`}
                    >
                        Salud y bienestar
                    </Link>
                    <Link
                        to={`/categories/${encodeURIComponent('Tecnología')}`}
                    >
                        Tecnología
                    </Link>
                    <Link
                        to={`/categories/${encodeURIComponent(
                            'Arte y cultura'
                        )}`}
                    >
                        Arte y cultura
                    </Link>
                    <Link to={`/categories/${encodeURIComponent('Juegos')}`}>
                        Juegos
                    </Link>
                </div>
                <h3>Conócenos</h3>
                <p>
                    <a /* a para rutas externas a direcciones fuera de nuestra API */
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
                </p>
            </nav>
            <p>©2024 Meetups</p>
        </footer>
    );
}

export default Footer;

/* footer responsive con 3 apartados:
        - tu cuenta (link directo a perfil del usuario si está logado)
        - meetups por categorias (links directos por categorías)
        - conocenos (miembros del equipo de desarollo)
*/
