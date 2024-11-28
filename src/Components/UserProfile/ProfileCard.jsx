import './ProfileCard.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useUser } from '../../UserContext';

function ProfileCard({ avatar, firstName, lastname, username, email }) {
    const [createdMeetupsCount, setCreatedMeetupsCount] = useState(0);
    const [attendedMeetupsCount, setAttendedMeetupsCount] = useState(0);
    const [user] = useUser();

    useEffect(() => {
        const fetchCreatedMeetups = async () => {
            try {
                const response = await fetch('http://localhost:3000/meetups');
                if (!response.ok) {
                    throw new Error('Error fetching meetups');
                }
                const data = await response.json();
                // Filtrar los meetups creados por el usuario (usando user.id)
                const createdMeetups = data.data.filter(
                    (meetup) => meetup.userId === user.id
                );
                setCreatedMeetupsCount(createdMeetups.length); // Contamos cuántos meetups creó el usuario
            } catch (err) {
                console.error('Error fetching created meetups:', err);
            }
        };

        fetchCreatedMeetups();
    }, [user.id]);

    useEffect(() => {
        const fetchAttendances = async () => {
            try {
                const response = await fetch(
                    'http://localhost:3000/attendance'
                );
                if (!response.ok) {
                    throw new Error('Error fetching attendances');
                }
                const data = await response.json();
                // Filtrar las asistencias por userId (el id del usuario actual)
                const userAttendances = data.data.filter(
                    (attendance) => attendance.userId === user.id
                );
                // Contamos los meetups a los que el usuario asistirá (basado en las asistencias)
                setAttendedMeetupsCount(userAttendances.length);
            } catch (err) {
                console.error('Error fetching attendances:', err);
            }
        };

        fetchAttendances();
    }, [user.id]);

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
                    <p>
                        {username.charAt(0).toUpperCase() + username.slice(1)}
                    </p>
                    <p>
                        {`${
                            firstName.charAt(0).toUpperCase() +
                            firstName.slice(1)
                        }`}
                    </p>
                    <p>{`${
                        lastname.charAt(0).toUpperCase() + lastname.slice(1)
                    }`}</p>
                    <p>{email}</p>
                </div>
            </div>
            <div id="contenedorDatosMeetupsUsuario">
                <div id="asistenciasMeetup">
                    <p>{attendedMeetupsCount}</p>
                    <p>A los que asiste</p>
                </div>

                <div id="meetupsEnPosesion">
                    <p>{createdMeetupsCount}</p>
                    <p>Creados por usted</p>
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
