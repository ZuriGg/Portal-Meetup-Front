import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './ProfileCard.css';

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
                <Link to="/user/avatar">
                    <button id="botonCambioAvatar">Editar avatar</button>
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

//ESPECIFICAR MEJOR ESTOS PROPTYPES
ProfileCard.propTypes = {
    avatar: PropTypes.string, // Es una cadena que representa el nombre del archivo o URL del avatar.
    firstName: PropTypes.string.isRequired, // Se utiliza como texto, por lo que debe ser un string. Marcado como requerido.
    lastname: PropTypes.string.isRequired, // Igual que `firstName`, debe ser string y requerido.
    username: PropTypes.string.isRequired, // Se muestra como texto, debe ser string y requerido.
    email: PropTypes.string.isRequired, // Es un correo electrónico, que también es un string y requerido.
    location: PropTypes.shape({
        // Es un objeto con las propiedades city, region y country.
        city: PropTypes.string.isRequired,
        region: PropTypes.string.isRequired,
        country: PropTypes.string.isRequired,
    }).isRequired,
};
