import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './LogoUser.css';
import { useUser } from '../../UserContext.jsx';

function LogoUser() {
    const [user, , handleLogout] = useUser(); // Obtenemos usuario y handleLogout del contexto
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

    if (user?.token) {
        return (
            <div id="componenteLogouser" onClick={(e) => e.stopPropagation()}>
                <div onClick={toggleModal} style={{ cursor: 'pointer' }}>
                    <img
                        id="avatarUsuario"
                        src={user.avatar || '/avatarDefault.webp'}
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
                        <Link to="/user/profile" className="modal-link">
                            Panel de Usuario
                        </Link>
                        {/* Este enlace ahora usa handleLogout */}
                        <Link
                            to="/"
                            className="modal-link"
                            onClick={(e) => {
                                e.preventDefault(); // Prevenimos la navegación del enlace
                                handleLogout(); // Llamamos al método del contexto
                            }}
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
