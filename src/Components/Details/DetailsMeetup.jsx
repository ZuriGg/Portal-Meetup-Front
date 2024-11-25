import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MeetupCard from '../MeetupCard/MeetupCard.jsx';

function DetailsMeetup() {
    const { id } = useParams(); // Obtiene el ID del meetup desde la URL
    const [meetupDetail, setMeetupDetail] = useState(null); // Estado para almacenar los datos
    const [loading, setLoading] = useState(true); // Estado para manejar el estado de carga

    useEffect(() => {
        const fetchMeetupDetail = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3000/meetups/${id}`
                );
                if (!response.ok) {
                    throw new Error('Error al obtener los detalles del meetup');
                }
                const data = await response.json();
                setMeetupDetail(data.data); // Guardamos la información del meetup
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false); // Finalizamos el estado de carga
            }
        };

        fetchMeetupDetail();
    }, [id]);

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
        <div>
            <MeetupCard
                image={meetupDetail.image}
                title={meetupDetail.title}
                description={meetupDetail.description}
                startDate={meetupDetail.startDate}
                hourMeetup={meetupDetail.hourMeetup}
                aforoMax={meetupDetail.aforoMax}
                inscribirseBoolean={meetupDetail.inscribirseBoolean}
            />
        </div>
    );
}

export default DetailsMeetup;
