import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import UserCard from '../../Components/UserCard/UserCard';
import { useUser } from '../../UserContext.jsx';
import { MeetupRatingList } from '../../Components/Rating/MeetupRatingList.jsx';
import Mapa from '../../Components/Mapa/Mapa.jsx';
//import OutOfService from '../../Components/OutOfService/OutOfService.jsx';

import './DetailsMeetup.css';

function DetailsMeetup() {
    const { meetupId } = useParams();
    const [meetupDetail, setMeetupDetail] = useState(''); // Estado para almacenar los datos
    const [attendance, setAttendance] = useState([]);
    const [meetupUsers, setMeetupUsers] = useState([]);
    const [responsePhotos, setResponsePhotos] = useState([]);
    const [imgIndex, setImgIndex] = useState(0);
    const [location, setLocation] = useState([]);
    const [loading, setLoading] = useState(true); // Estado para manejar el estado de carga
    const [availableDates, setAvailableDates] = useState([]); // Estado para guardar los días disponibles en la BBDD
    const [selectedDay, setSelectedDay] = useState(null); // Nuevo estado que guarda el día seleccionado
    const [user, ,] = useUser(); // Obtén el usuario desde el UserContext
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [votos, setVotos] = useState('');

    const URL_BACK = import.meta.env.VITE_URL_BACK;

    console.log('DetailsMeetup - meetupId obtenido de useParams:', meetupId);

    useEffect(() => {
        console.log('Fetching data for meetupId:', meetupId);
        if (!meetupId) return;
        const fetchData = async () => {
            setLoading(true);
            try {
                const responseMeetup = await fetch(
                    `${URL_BACK}/meetups/${meetupId}`
                );
                if (!responseMeetup.ok) {
                    throw new Error('Error al obtener los detalles del meetup');
                }
                const dataMeetup = await responseMeetup.json();
                setMeetupDetail(dataMeetup.data); // Fetch de asistencia al meetup
                const responseAttendance = await fetch(
                    `${URL_BACK}/attendance`
                );
                if (!responseAttendance.ok) {
                    throw new Error('Error al obtener la asistencia al meetup');
                }
                const dataAttendance = await responseAttendance.json();
                setAttendance(dataAttendance.data); // Fetch de usuarios
                const responseUsers = await fetch(`${URL_BACK}/users`);
                if (!responseUsers.ok) {
                    throw new Error('Error al obtener los usuarios');
                }
                const dataUsers = await responseUsers.json();
                setMeetupUsers(dataUsers.data);

                setSuccess(true);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false); // Finalizamos el estado de carga
            }
        };
        fetchData();
    }, [meetupId]);

    useEffect(() => {
        const fetchData = async () => {
            const responsePhotos = await fetch(
                `${URL_BACK}/meetups/${meetupId}/photos`
            );
            const dataPhotos = await responsePhotos.json();
            setResponsePhotos(dataPhotos.data);

            if (!responsePhotos.ok) {
                throw new Error('Error al obtener los usuarios');
            }
        };
        fetchData();
    }, [imgIndex]);

    //  useEffect para obtener la location después de que meetupDetail ha sido actualizado
    useEffect(() => {
        if (meetupDetail && meetupDetail.locationId) {
            const fetchLocation = async () => {
                try {
                    const responseLocation = await fetch(
                        `${URL_BACK}/location/${meetupDetail.locationId}`
                    );
                    if (!responseLocation.ok) {
                        throw new Error('Error al obtener la ubicación');
                    }
                    const dataLocation = await responseLocation.json();
                    setLocation(dataLocation.data);
                } catch (error) {
                    console.error('Error:', error);
                }
            };
            fetchLocation();
        }
    }, [meetupDetail]);

    // Filtrar usuarios que asistieron al meetup.sdds
    const attendanceMeetup = attendance
        .filter((att) => att.meetupId === Number(meetupId))
        .map((att) => {
            const user = meetupUsers.find((user) => user.id === att.userId);
            if (user) {
                // Convertir la fecha de asistencia a solo la parte de la fecha (sin hora)
                const attendanceDate = new Date(att.date);
                const normalizedAttendanceDate = new Date(
                    attendanceDate.setHours(0, 0, 0, 0)
                ); // Normalizamos a medianoche

                // Obtener la próxima fecha disponible (sin hora)
                const firstAvailableDate = availableDates[0];
                const normalizedAvailableDate = new Date(
                    firstAvailableDate.setHours(0, 0, 0, 0)
                ); // Normalizamos a medianoche

                // Comparar fechas sin hora
                if (
                    normalizedAttendanceDate.getTime() ===
                    normalizedAvailableDate.getTime()
                ) {
                    return user; // Si coinciden, incluir al usuario
                }
            }
            return null; // No incluir si no coincide
        })
        .filter((user) => user !== null);

    console.log('Usuarios inscritos en la próxima fecha:', attendanceMeetup);

    // Renderiza los días disponibles
    useEffect(() => {
        if (meetupDetail?.dayOfTheWeek) {
            const calculateNextDates = () => {
                const today = new Date();
                const currentDay = today.getDay(); // Día actual (0 = domingo, 6 = sábado)
                const dayOfWeekMap = {
                    domingo: 0,
                    lunes: 1,
                    martes: 2,
                    miercoles: 3,
                    jueves: 4,
                    viernes: 5,
                    sabado: 6,
                };

                const targetDay =
                    dayOfWeekMap[meetupDetail.dayOfTheWeek.toLowerCase()];
                const dates = [];

                const diffToNextWeek =
                    targetDay >= currentDay
                        ? targetDay - currentDay
                        : 7 - (currentDay - targetDay);

                // Primera fecha disponible
                const firstDate = new Date(today);
                firstDate.setDate(today.getDate() + diffToNextWeek);
                dates.push(firstDate);

                // Segunda fecha disponible (una semana después)
                const secondDate = new Date(firstDate);
                secondDate.setDate(firstDate.getDate() + 7);
                dates.push(secondDate);

                setAvailableDates(dates);
            };

            calculateNextDates();
        }
    }, [meetupDetail]);

    // Función que maneja la selección de la fecha
    const handleDateSelect = async (date) => {
        setSelectedDay(date);

        const userId = user.id;
        const formattedDate = date.toISOString().slice(0, 19).replace('T', ' '); // '2024-12-04 04:04:05'

        try {
            const response = await fetch(
                `${URL_BACK}/meetups/${meetupId}/inscription`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        user: userId,
                        Authorization: `${user.token.token}`,
                    },
                    body: JSON.stringify({
                        date: formattedDate,
                    }),
                }
            );

            if (response.ok) {
                // Actualiza la asistencia
                const updatedAttendance = await fetch(
                    'http://localhost:3000/attendance'
                );
                const dataAttendance = await updatedAttendance.json();
                setAttendance(dataAttendance.data); // Actualizar los datos de asistencia
                setSuccess(true);
                setError('');
            } else {
                setError('Error al procesar la inscripción');
            }
        } catch (error) {
            console.error('Error al inscribirse:', error);
            setError('Error al procesar la inscripción');
        }
    };

    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const response = await fetch(
                    'http://localhost:3000/attendance'
                );
                if (!response.ok) {
                    throw new Error('Error al obtener la asistencia al meetup');
                }
                const data = await response.json();
                setAttendance(data.data); // Actualiza el estado de asistencia
            } catch (error) {
                console.error('Error al actualizar asistencia:', error);
            }
        };

        fetchAttendance(); // Llamada para actualizar la asistencia
    }, [selectedDay, meetupId]); // Dependencias: cuando cambian selectedDay o meetupId

    // Mostrar un mensaje de carga mientras se obtienen los datos
    if (loading) {
        return <p>Cargando meetup...</p>;
    }

    // Mostrar un mensaje si no se encuentra el meetup
    if (!meetupDetail) {
        return <p>Meetup no encontrado.</p>;
    }

    const handleImgChangeMore = () => {
        setImgIndex((prevIndex) => (prevIndex < 2 ? prevIndex + 1 : prevIndex));
    };

    const handleImgChangeLess = () => {
        setImgIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
    };

    console.log('Valor de oneSession:', meetupDetail.oneSession);

    // Renderizar los datos del meetup
    return (
        <div id="detallesMeetupContainer">
            <div id="meetupDetalles">
                <div className="detailsPage">
                    <h3 className="detailsTitle">{meetupDetail.title}</h3>

                    <div id="areaImagen">
                        {responsePhotos[imgIndex] &&
                        responsePhotos[imgIndex].name ? (
                            <>
                                <img
                                    className="flechaDetallesMeetup"
                                    id="flechaDerecha"
                                    src="/interface/flechaDerechaBlanco.webp"
                                    alt="flecha de cambio de imagen"
                                    onClick={handleImgChangeMore}
                                />
                                <img
                                    className="flechaDetallesMeetup"
                                    id="FlechaIzquierda"
                                    src="/interface/flechaIzquierdaBlanco.webp"
                                    alt="flecha de cambio de imagen"
                                    onClick={handleImgChangeLess}
                                />
                            </>
                        ) : null}

                        <img
                            src={
                                responsePhotos[imgIndex] &&
                                responsePhotos[imgIndex].name
                                    ? `${URL_BACK}/uploads/${responsePhotos[imgIndex].name}`
                                    : '/meetupPhotoDefault.jpg'
                            }
                            alt="Imagen del meetup"
                            className="detailsImage"
                        />
                    </div>

                    <div className="available-dates">
                        {meetupDetail.userId === user.id ? (
                            <button id="meetupEditButton">
                                <NavLink to={`/meetup/${meetupId}/edit`}>
                                    Editar meetup
                                </NavLink>
                            </button>
                        ) : null}

                        {meetupDetail?.oneSession === 0 ? (
                            <>
                                <h4>Fechas disponibles para inscribirse:</h4>

                                <h5>
                                    Hora del meetup:{' '}
                                    {meetupDetail.hourMeetup
                                        .split(':')
                                        .slice(0, 2)
                                        .join(':')}
                                </h5>

                                {availableDates.map((date, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleDateSelect(date)}
                                    >
                                        {date.toLocaleDateString()}
                                    </button>
                                ))}

                                {selectedDay && success && (
                                    <div>
                                        <p>
                                            Has seleccionado el día:
                                            {selectedDay.toLocaleDateString()}
                                        </p>
                                        {error && <p>{error}</p>}
                                    </div>
                                )}

                                <p className="detailsStartDate">
                                    <b>Primera sesión:</b>
                                    {` ${new Date(
                                        meetupDetail.startDate
                                    ).toLocaleDateString()}`}
                                </p>
                            </>
                        ) : (
                            <>
                                <h4>Fecha del evento:</h4>

                                <button
                                    onClick={() =>
                                        handleDateSelect(meetupDetail.startDate)
                                    }
                                >
                                    Inscribirse:
                                    {` ${new Date(
                                        meetupDetail.startDate
                                    ).toLocaleDateString()}`}{' '}
                                    -{' '}
                                    {meetupDetail.hourMeetup
                                        .split(':')
                                        .slice(0, 2)
                                        .join(':')}
                                </button>
                            </>
                        )}
                    </div>

                    <p>
                        <b>Valoración media:</b> {votos} / 5 ⭐
                    </p>

                    <p>{`${location.city}, ${location.address}, ${location.zip}`}</p>

                    <h4>Descripción</h4>
                    <p className="detailsDescription">
                        {meetupDetail.description}
                    </p>
                </div>
                <div id="votesContainer">
                    <MeetupRatingList
                        meetupId={Number(meetupId)}
                        setVotos={setVotos}
                    />
                </div>
            </div>

            <div id="locationContainer">
                <div id="datosUbicacionDetallesMeetup">
                    <h4 id="h4Asistentes">Asistentes</h4>
                    <ul>
                        {attendanceMeetup &&
                        Array.isArray(attendanceMeetup) &&
                        attendanceMeetup.length > 0 ? (
                            attendanceMeetup.map(
                                (user) =>
                                    user && (
                                        <li key={user.id}>
                                            <UserCard
                                                avatar={user.avatar}
                                                username={user.username}
                                                activatedButton={false}
                                            />
                                        </li>
                                    )
                            )
                        ) : (
                            <p>Nadie asistirá por el momento.</p>
                        )}
                    </ul>

                    <h4>Ubicación</h4>
                    <p className="mapLocation">{`${location.city}, ${location.address}, ${location.zip}`}</p>
                </div>
                <Mapa
                    city={location.city}
                    street={location.address}
                    zip={location.zip}
                />
            </div>
        </div>
    );
}

export default DetailsMeetup;
