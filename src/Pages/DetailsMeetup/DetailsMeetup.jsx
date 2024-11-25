import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserCard from '../../Components/UserCard/UserCard';

function DetailsMeetup() {
    const { meetupId } = useParams(); // Obtiene el ID del meetup desde la URL
    const [meetupDetail, setMeetupDetail] = useState(null); // Estado para almacenar los datos
    const [attendance, setAttendance] = useState([]);
    const [meetupUsers, setMeetupUsers] = useState([]);
    const [loading, setLoading] = useState(true); // Estado para manejar el estado de carga

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch de detalles del meetup
                const responseMeetup = await fetch(
                    `http://localhost:3000/meetups/${meetupId}`
                );
                if (!responseMeetup.ok) {
                    throw new Error('Error al obtener los detalles del meetup');
                }
                const dataMeetup = await responseMeetup.json();
                setMeetupDetail(dataMeetup.data);

                // Fetch de asistencia al meetup
                const responseAttendance = await fetch(
                    'http://localhost:3000/attendance'
                );
                if (!responseAttendance.ok) {
                    throw new Error('Error al obtener la asistencia al meetup');
                }
                const dataAttendance = await responseAttendance.json();
                setAttendance(dataAttendance.data);

                // Fetch de usuarios
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

    // Filtrar usuarios que asistieron al meetup
    const attendanceMeetup = attendance
        .filter((att) => att.meetupId === meetupId) // Convertimos meetupId a número
        .map((att) => {
            // Buscar el usuario correspondiente en meetupUsers
            const user = meetupUsers.find((user) => user.id === att.userId);
            return user;
        })
        .filter((user) => user !== undefined); // Filtramos usuarios válidos

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
                <div className="detailsTitle">{meetupDetail.title}</div>

                <img
                    src={meetupDetail.image || '/meetupPhotoDefault.jpg'}
                    alt="Imagen del meetup"
                    className="detailsImage"
                />

                <div className="detailsStartDate">
                    {new Date(meetupDetail.startDate).toLocaleDateString()}
                </div>

                <div className="detailsDescription">
                    {meetupDetail.description}
                </div>

                {/* Renderizar la lista de asistentes */}
                <ul>
                    {attendanceMeetup.map((user) => (
                        <li key={user.id}>
                            <UserCard
                                avatar={user.avatar}
                                username={user.username}
                                activatedButton={false}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default DetailsMeetup;
