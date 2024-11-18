import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LogoUser.css';

function LogoUser() {
    const sessionData = JSON.parse(localStorage.getItem('session'));

    const [isModalOpen, setModalOpen] = useState(false);
    let flecha = isModalOpen ? 'arriba' : 'abajo';

    const toggleModal = () => {
        setModalOpen((prevState) => !prevState);
    };

    let username;

    if (sessionData) {
        username = sessionData.username;
        return (
            <div id="componenteLogouser">
                <div onClick={toggleModal} style={{ cursor: 'pointer' }}>
                    <img
                        id="avatarUsuario"
                        src="/avatarDefault.webp"
                        alt="Avatar de usuario"
                    />

                    {(() => {
                        switch (flecha) {
                            case 'arriba':
                                return (
                                    <img
                                        id="flechaUser"
                                        src="/interface/flechaArribaBlanco.webp"
                                        alt="Flecha hacia arriba"
                                    />
                                );
                            case 'abajo':
                                return (
                                    <img
                                        id="flechaUser"
                                        src="/interface/flechaAbajoBlanco.webp"
                                        alt="Flecha hacia abajo"
                                    />
                                );
                        }
                    })()}
                </div>

                {isModalOpen && (
                    <div id="modalOpcionesUsuario">
                        <p>{username}</p>
                        <Link to="/user/profile" className="modal-link">
                            Panel de Usuario
                        </Link>
                        <Link
                            to="/"
                            className="modal-link"
                            onClick={() => {
                                localStorage.removeItem('session');
                                window.location.reload();
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
