import './ProfileCard.css';
import React from 'react';
import { Link } from 'react-router-dom';

function ProfileCard({
    avatar,
    firstName,
    lastname,
    username,
    email,
    location,
}) {
    return (
        <div id="profileCard">
            <div
                id="datosUsuarioContainer"
                style={{
                    backgroundImage: avatar
                        ? `url(http://localhost:3000/uploads/${avatar})`
                        : null,
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
                    <p>{`${location.city}, ${location.region}, ${location.country}`}</p>
                </div>
            </div>
            <div id="contenedorDatosMeetupsUsuario">
                <div id="asistenciasMeetup">
                    <p>12</p>
                    <p>Asistirás</p>
                </div>

                <div id="meetupsEnPosesion">
                    <p>2</p>
                    <p>Meetups propios</p>
                </div>
            </div>
        </div>
    );
}

export default ProfileCard;