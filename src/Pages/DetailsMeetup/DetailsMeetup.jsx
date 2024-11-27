import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserCard from '../../Components/UserCard/UserCard';
import { useUser } from '../../UserContext.jsx';

function DetailsMeetup() {
    const { meetupId } = useParams(); // Obtiene el ID del meetup desde la URL
    const [meetupDetail, setMeetupDetail] = useState(''); // Estado para almacenar los datos
    const [attendance, setAttendance] = useState([]);
    const [meetupUsers, setMeetupUsers] = useState([]);
    const [location, setLocation] = useState([]);
    const [loading, setLoading] = useState(true); // Estado para manejar el estado de carga
    const [availableDates, setAvailableDates] = useState([]); // Estado para guardar los días disponibles en la BBDD
    const [selectedDay, setSelectedDay] = useState(null); // Nuevo estado que guarda el día seleccionado
    const [user, ,] = useUser(); // Obtén el usuario desde el UserContext

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const responseMeetup = await fetch(
                    `http://localhost:3000/meetups/${meetupId}`
                );
                if (!responseMeetup.ok) {
                    throw new Error('Error al obtener los detalles del meetup');
                }
                const dataMeetup = await responseMeetup.json();
                setMeetupDetail(dataMeetup.data); // Fetch de asistencia al meetup
                const responseAttendance = await fetch(
                    'http://localhost:3000/attendance'
                );
                if (!responseAttendance.ok) {
                    throw new Error('Error al obtener la asistencia al meetup');
                }
                const dataAttendance = await responseAttendance.json();
                setAttendance(dataAttendance.data); // Fetch de usuarios
                const responseUsers = await fetch(
                    'http://localhost:3000/users'
                );
                if (!responseUsers.ok) {
                    throw new Error('Error al obtener los usuarios');
                }
                const dataUsers = await responseUsers.json();
                setMeetupUsers(dataUsers.data);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false); // Finalizamos el estado de carga
            }
        };
        fetchData();
    }, [meetupId]);

    // Nuevo useEffect para obtener la location después de que meetupDetail ha sido actualizado
    useEffect(() => {
        if (meetupDetail && meetupDetail.locationId) {
            const fetchLocation = async () => {
                try {
                    const responseLocation = await fetch(
                        `http://localhost:3000/location/${meetupDetail.locationId}`
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

    // Filtrar usuarios que asistieron al meetup
    const attendanceMeetup = attendance
        .filter((att) => att.meetupId === Number(meetupId))
        .map((att) => {
            return meetupUsers.find((user) => user.id === att.userId);
        });

    console.log('Los usuarios son:', attendanceMeetup);

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

                // Si el día objetivo ya pasó esta semana, lo ajustamos para la próxima semana
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
        alert(`Has seleccionado el día: ${date.toLocaleDateString()}`);

        // Obtener el userId desde el UserContext
        const userId = user.id;
        const formattedDate = date.toISOString().slice(0, 19).replace('T', ' '); // '2024-12-04 04:04:05'

        // Enviar la solicitud de inscripción al backend
        try {
            const response = await fetch(
                `http://localhost:3000/meetups/${meetupId}/inscription`,
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

            if (!response.ok) {
                throw new Error('Error al inscribirse al meetup');
            }

            const result = await response.json();
            console.log('Inscripción exitosa:', result);
        } catch (error) {
            console.error('Error al inscribirse:', error);
        }
    };

    // Mostrar un mensaje de carga mientras se obtienen los datos
    if (loading) {
        return <p>Cargando meetup...</p>;
    }

    // Mostrar un mensaje si no se encuentra el meetup
    if (!meetupDetail) {
        return <p>Meetup no encontrado.</p>;
    }

    // Renderizar los datos del meetup
    return (
        <>
            <div className="detailsPage">
                <p className="detailsTitle">{meetupDetail.title}</p>

                <img
                    src={meetupDetail.image || '/meetupPhotoDefault.jpg'}
                    alt="Imagen del meetup"
                    className="detailsImage"
                />

                <p className="detailsStartDate">
                    {new Date(meetupDetail.startDate).toLocaleDateString()}
                </p>

                <div className="detailsDescription">
                    {meetupDetail.description}
                </div>

                {/* Renderizar la lista de asistentes */}
                <p className="mapLocation">{location.city}</p>
                <ul>
                    {attendanceMeetup.map(
                        (user) =>
                            user && ( // Asegura que user no es null o undefined
                                <li key={user.id}>
                                    <UserCard
                                        avatar={user.avatar}
                                        username={user.username}
                                        activatedButton={false}
                                    />
                                </li>
                            )
                    )}
                </ul>
                <div className="available-dates">
                    <h3>Fechas disponibles para inscribirse:</h3>
                    {availableDates.map((date, index) => (
                        <button
                            key={index}
                            onClick={() => handleDateSelect(date)}
                        >
                            {date.toLocaleDateString()}
                        </button>
                    ))}
                </div>

                {/* Mostrar la fecha seleccionada si existe */}
                {selectedDay && (
                    <div>
                        <p>
                            Has seleccionado el día:{' '}
                            {selectedDay.toLocaleDateString()}
                        </p>
                    </div>
                )}
            </div>
        </>
    );
}

export default DetailsMeetup;
