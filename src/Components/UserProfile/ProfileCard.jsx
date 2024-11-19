import './ProfileCard.css';
import React from 'react';
import { Link } from 'react-router-dom';

function ProfileCard() {
    return (
        <div id="profileCard">
            <div id="datosUsuarioContainer">
                <Link to="/user/edit">
                    <button id="botonCambioAvatar">
                        Cambiar foto de perfil
                    </button>
                </Link>
                <div id="datosUsuario">
                    <p>Nombre</p>
                    <p>Correo electrónico</p>
                    <p>Ciudad, provincia</p>
                </div>
            </div>

            <div id="numerosMeetupsusUario">
                <p>0</p>
                <p>12</p>
                <p>2</p>
            </div>

            <div id="datosMeetupsUsuario">
                <p>Incripciones</p>
                <p>Asistirás</p>
                <p>En posesión</p>
            </div>
        </div>
    );
}

export default ProfileCard;
