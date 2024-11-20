import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './LogoUser.css';

function LogoUser() {
    const sessionData = JSON.parse(localStorage.getItem('session'));

    const [isModalOpen, setModalOpen] = useState(false);
    const modalRef = useRef(null); // Referencia al modal
    let flecha = isModalOpen ? 'arriba' : 'abajo';

    const toggleModal = (event) => {
        event.stopPropagation(); // Detenemos la propagación para que el clic no cierre el modal
        setModalOpen((prevState) => !prevState);
    };

    // Función para cerrar el modal si el clic ocurre fuera del modal
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

    let username;

    if (sessionData) {
        username = sessionData.username;
        return (
            <div id="componenteLogouser" onClick={(e) => e.stopPropagation()}>
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
                    <div
                        id="modalOpcionesUsuario"
                        ref={modalRef}
                        onClick={(e) => e.stopPropagation()} // Detenemos la propagación dentro del modal
                    >
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
