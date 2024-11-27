import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserCard from '../../Components/UserCard/UserCard';

function DetailsMeetup() {
    const { meetupId } = useParams(); // Obtiene el ID del meetup desde la URL
    const [meetupDetail, setMeetupDetail] = useState(''); // Estado para almacenar los datos
    const [attendance, setAttendance] = useState([]);
    const [meetupUsers, setMeetupUsers] = useState([]);
    const [location, setLocation] = useState([]);
    const [loading, setLoading] = useState(true); // Estado para manejar el estado de carga

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

    console.log(`los usuarios son ${attendanceMeetup}`);

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
