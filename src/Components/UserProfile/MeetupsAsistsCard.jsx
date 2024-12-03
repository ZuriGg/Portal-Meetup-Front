import './MeetupsAsistsCard.css';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useUser } from '../../UserContext.jsx';
import AttendanceCard from '../AttendanceCard/AttendanceCard.jsx';
import MeetupCard from '../MeetupCard/MeetupCard.jsx';
import { NavLink } from 'react-router-dom';

function MeetupsListCard({ titulo, url }) {
    const [attendances, setAttendances] = useState([]);
    const [meetups, setMeetups] = useState([]);
    const [images, setImages] = useState({});
    const [user] = useUser();
    const [selectedAttendance, setSelectedAttendance] = useState(null); // Nuevo estado para el `li` seleccionado

    const URL_BACK = import.meta.env.VITE_URL_BACK;

    useEffect(() => {
        // Fetch de las asistencias
        fetch(`${URL_BACK}/${url}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Error fetching attendance data');
                }
                return res.json();
            })
            .then((data) => {
                setAttendances(
                    data.data.filter((att) => att.userId === user.id)
                ); // Filtra por usuario actual
            });
    }, [url, user.id]);

    useEffect(() => {
        // Fetch de los meetups asociados a las asistencias
        const fetchMeetups = async () => {
            try {
                const meetupPromises = attendances.map((attendance) =>
                    fetch(`${URL_BACK}/meetups/${attendance.meetupId}`)
                        .then((res) => {
                            if (!res.ok)
                                throw new Error('Error fetching meetup');
                            return res.json();
                        })
                        .then((data) => data.data)
                );

                const meetupsData = await Promise.all(meetupPromises);
                setMeetups(meetupsData);
            } catch (err) {
                console.error('Error fetching meetups:', err);
            }
        };

        if (attendances.length > 0) {
            fetchMeetups();
        }
    }, [attendances]);

    useEffect(() => {
        // Fetch de las imágenes de los meetups
        const fetchImages = async () => {
            try {
                const imagePromises = meetups.map(async (meetup) => {
                    const response = await fetch(
                        `${URL_BACK}/meetups/${meetup.id}/photos`
                    );
                    const imagesData = await response.json();

                    const imageUrl =
                        imagesData.data.length > 0
                            ? `${URL_BACK}/uploads/${imagesData.data[0].name}`
                            : '/meetupPhotoDefault.jpg';

                    return { [meetup.id]: imageUrl };
                });

                const imagesArray = await Promise.all(imagePromises);
                const imagesObj = imagesArray.reduce(
                    (acc, curr) => ({ ...acc, ...curr }),
                    {}
                );
                setImages(imagesObj);
            } catch (err) {
                console.error('Error fetching images:', err);
            }
        };

        if (meetups.length > 0) {
            fetchImages();
        }
    }, [meetups]);

    // Obtener la fecha actual en formato YYYY-MM-DD (solo la fecha, sin la hora)
    const currentDate = new Date().toISOString().split('T')[0];

    return (
        <div id="attendanceListCard">
            <h3>{titulo}</h3>
            <ul>
                {attendances.length > 0 ? (
                    attendances.map((attendance) => {
                        const meetup = meetups.find(
                            (m) => m.id === attendance.meetupId
                        );

                        if (!meetup) return null;

                        const isSelected = selectedAttendance === attendance.id;

                        // Compara la fecha de la asistencia con la fecha actual
                        const canVote = attendance.date <= currentDate; // Mostrar el botón solo si la fecha de la asistencia es anterior o igual a la fecha actual

                        return (
                            <li
                                key={attendance.id}
                                onClick={
                                    () => setSelectedAttendance(attendance.id) // Cambia el estado al hacer clic
                                }
                            >
                                {/* Si el li está seleccionado, mostramos los botones */}
                                {isSelected ? (
                                    <div className="buttons-container">
                                        <NavLink
                                            to={`/meetup/${meetup.id}`}
                                            className="button"
                                        >
                                            <button>Ver Meetup</button>
                                        </NavLink>
                                        {/* Mostrar el botón "Votar Sesión" solo si la fecha es anterior o igual a la fecha actual */}
                                        {canVote && (
                                            <NavLink
                                                to={`/meetup/${attendance.id}/votes`}
                                                className="button"
                                            >
                                                <button>Votar Sesión</button>
                                            </NavLink>
                                        )}
                                    </div>
                                ) : (
                                    <div className="meetup-and-attendance">
                                        <MeetupCard
                                            title={meetup.title}
                                            startDate={meetup.startDate}
                                            hourMeetup={meetup.hourMeetup
                                                .split(':')
                                                .slice(0, 2)
                                                .join(':')}
                                            aforoMax={meetup.aforoMax}
                                            image={images[meetup.id]}
                                            dayOfTheWeek={
                                                meetup.dayOfTheWeek
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                meetup.dayOfTheWeek.slice(1)
                                            }
                                        />
                                        <AttendanceCard
                                            date={
                                                new Date(attendance.date)
                                                    .toISOString()
                                                    .split('T')[0]
                                            }
                                        />
                                    </div>
                                )}
                            </li>
                        );
                    })
                ) : (
                    <p>No se encontraron asistencias.</p>
                )}
            </ul>
        </div>
    );
}

export default MeetupsListCard;

// ESPECIFICAR MEJOR ESTOS PROPTYPES
MeetupsListCard.propTypes = {
    titulo: PropTypes.string.isRequired, // Representa el título, debe ser un string y requerido.
    url: PropTypes.string.isRequired, // Es la URL o endpoint para el fetch, debe ser un string y requerido.
};
