// Header condicional según si el usuario está registrado o no, accederá al token y mostrara un header u otro en cuestión del tipo de usuario que sea (Anónimo o Normal)
import { Link } from 'react-router-dom';
import './Header.css';
import LogoUser from './LogoUser.jsx';

function Header() {
    return (
        <>
            <header>
                <Link to="/">
                    <img src="/logotipo.webp" alt="logotipo de la web" />
                </Link>
                <div>
                    <Link to="/">
                        <button>/</button>
                    </Link>
                    <Link to="/user/register">
                        <button>/user/register</button>
                    </Link>
                    <Link to="/user/validate">
                        <button>/user/validate</button>
                    </Link>
                    <Link to="/user/login">
                        <button>/user/login</button>
                    </Link>
                    <Link to="/user/edit">
                        <button>/user/edit</button>
                    </Link>
                    <Link to="/meetup/create">
                        <button>/meetup/create</button>
                    </Link>
                    <Link to="/meetup/edit">
                        <button>/meetup/edit</button>
                    </Link>
                    <Link to="/user/password/recover">
                        <button>/user/password/recover</button>
                    </Link>
                </div>
                <LogoUser />
            </header>
        </>
    );
}

export default Header;
