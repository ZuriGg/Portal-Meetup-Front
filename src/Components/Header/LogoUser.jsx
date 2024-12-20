import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../UserContext.jsx';

import './LogoUser.css';

function LogoUser() {
    const [user, , handleLogout] = useUser();
    const [isModalOpen, setModalOpen] = useState(false);
    const modalRef = useRef(null);

    const URL_BACK = import.meta.env.VITE_URL_BACK;

    const toggleModal = (event) => {
        event.stopPropagation();
        setModalOpen((prevState) => !prevState);
    };

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setModalOpen(false);
        }
    };

    useEffect(() => {
        if (isModalOpen) {
            document.addEventListener('click', handleClickOutside);
        } else {
            document.removeEventListener('click', handleClickOutside);
        }
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isModalOpen]);

    const closeAndNavigate = (callback) => () => {
        setModalOpen(false);
        if (callback) callback();
    };

    if (user?.token) {
        return (
            <div id="componenteLogouser" onClick={(e) => e.stopPropagation()}>
                <div onClick={toggleModal} style={{ cursor: 'pointer' }}>
                    <img
                        id="avatarUsuario"
                        src={
                            user.avatar === null
                                ? '/avatarDefault.webp'
                                : `${URL_BACK}/uploads/${user.avatar}`
                        }
                        alt="Avatar de usuario"
                    />
                    <img
                        id="flechaUser"
                        src={`/interface/flecha${
                            isModalOpen ? 'Arriba' : 'Abajo'
                        }Blanco.webp`}
                        alt="Flecha"
                    />
                </div>
                {isModalOpen && (
                    <div
                        id="modalOpcionesUsuario"
                        ref={modalRef}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <p>{user.username}</p>
                        <Link
                            to="/user/profile"
                            className="modal-link"
                            onClick={closeAndNavigate()}
                        >
                            Panel de Usuario
                        </Link>
                        {user.role === 'admin' && (
                            <Link
                                to="/admin"
                                className="modal-link"
                                onClick={closeAndNavigate()}
                            >
                                Panel de Admin
                            </Link>
                        )}
                        <Link
                            to="/meetup/create"
                            className="modal-link"
                            onClick={closeAndNavigate()}
                        >
                            Crear meetup
                        </Link>
                        <p>Ajustes</p>
                        <Link
                            to="/"
                            className="modal-link"
                            onClick={closeAndNavigate(handleLogout)}
                        >
                            Cerrar Sesión
                        </Link>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div id="componenteLogouser">
            <Link to="/user/login">Login</Link>
            <Link to="/user/register">Register</Link>
        </div>
    );
}

export default LogoUser;
