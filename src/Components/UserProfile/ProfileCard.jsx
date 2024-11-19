import './ProfileCard.css';
import React from 'react';
import { Link } from 'react-router-dom';

function ProfileCard({ avatar, firstName, lastname, username, email }) {
    return (
        <div id="profileCard">
            <div
                id="datosUsuarioContainer"
                style={{
                    backgroundImage: avatar ? `url(${avatar})` : null,
                }}
            >
                <Link to="/user/edit">
                    <button id="botonCambioAvatar">
                        Cambiar foto de perfil
                    </button>
                </Link>
                <div id="datosUsuario">
                    <p>{username}</p>
                    <p>{`${firstName} ${lastname}`}</p>
                    <p>{email}</p>
                    <p>Ubicación</p>
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
