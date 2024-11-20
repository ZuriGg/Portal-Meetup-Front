import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './LogoUser.css';
import { useUser } from '../../UserContext.jsx';

function LogoUser() {
    const [user, , handleLogout] = useUser();
    const [isModalOpen, setModalOpen] = useState(false);
    const modalRef = useRef(null);

    const toggleModal = (event) => {
        event.stopPropagation();
        setModalOpen((prevState) => !prevState);
    };

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setModalOpen(false);
        }
    };

    React.useEffect(() => {
        if (isModalOpen) {
            document.addEventListener('click', handleClickOutside);
        } else {
            document.removeEventListener('click', handleClickOutside);
        }
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isModalOpen]);

    const closeAndNavigate = (callback) => (e) => {
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
                            `http://localhost:3000/uploads/${user.avatar}` ||
                            '/avatarDefault.webp'
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
