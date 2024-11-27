import './MeetupsAsistsCard.css';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useUser } from '../../UserContext.jsx';
import AttendanceCard from '../AttendanceCard/AttendanceCard.jsx';
import MeetupCard from '../MeetupCard/MeetupCard.jsx';
import { Link } from 'react-router-dom';

function MeetupsListCard({ titulo, url }) {
    const [attendances, setAttendances] = useState([]);
    const [meetups, setMeetups] = useState([]);
    const [images, setImages] = useState({});
    const [user] = useUser();

    useEffect(() => {
        // Fetch de las asistencias
        fetch(`http://localhost:3000/${url}`)
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
                    fetch(
                        `http://localhost:3000/meetups/${attendance.meetupId}`
                    )
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
                        `http://localhost:3000/meetups/${meetup.id}/photos`
                    );
                    const imagesData = await response.json();

                    const imageUrl =
                        imagesData.data.length > 0
                            ? `http://localhost:3000/uploads/${imagesData.data[0].name}`
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

                        return (
                            <li key={attendance.id}>
                                <Link to={`/meetup/${meetup.id}`}>
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
                                </Link>
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
