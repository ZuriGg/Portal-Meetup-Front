import './ProfileCard.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useUser } from '../../UserContext';

function ProfileCard({ avatar, firstName, lastname, username, email }) {
    const [createdMeetupsCount, setCreatedMeetupsCount] = useState(0);
    const [attendedMeetupsCount, setAttendedMeetupsCount] = useState(0);
    const [user] = useUser();

    const URL_BACK = import.meta.env.VITE_URL_BACK;

    useEffect(() => {
        const fetchCreatedMeetups = async () => {
            try {
                const response = await fetch(`${URL_BACK}/meetups`);
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
                const response = await fetch(`${URL_BACK}/attendance`);
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
                        ? `url(${URL_BACK}/uploads/${avatar})`
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

ProfileCard.propTypes = {
    avatar: PropTypes.string,
    firstName: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    location: PropTypes.shape({
        city: PropTypes.string.isRequired,
        region: PropTypes.string.isRequired,
        country: PropTypes.string.isRequired,
    }).isRequired,
};
