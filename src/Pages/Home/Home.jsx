import './Home.css';
import { useEffect, useState } from 'react';

import MeetupCard from '../../Components/MeetupCard/MeetupCard.jsx';
import { useMeetup } from '../../MeetupContext.jsx';
import Category from '../../Components/Home/Category/Category.jsx';
import Filters from '../../Components/Home/Filters/Filters.jsx';
import SortFilter from '../../Components/Home/SortFilter/SortFilter.jsx';
import { Link } from 'react-router-dom';

function Home() {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const URL_BACK = import.meta.env.VITE_URL_BACK;

    /*     const [votes, setVotes] = useState([]); //para gestionar los votos
    const [attendance, setAttendance] = useState([]); //para gestionar las asistencias */

    const { qry } = useMeetup();
    const [images, setImages] = useState({}); // Este estado almacenará las imágenes por id de meetup

    useEffect(() => {
        const fetchMeetups = async () => {
            try {
                const response = await fetch(
                    qry ? `${URL_BACK}/meetups?${qry}` : `${URL_BACK}/meetups`
                );
                if (!response.ok) throw new Error('Error fetching data');
                const data = await response.json();

                // Obtén información adicional como valoraciones y ubicaciones
                const additionalDataPromises = data.data.map(async (meetup) => {
                    const [votesRes, locationRes] = await Promise.all([
                        fetch(
                            `http://localhost:3000/meetups/${meetup.id}/votes`
                        ),
                        fetch(
                            `http://localhost:3000/location/${meetup.locationId}`
                        ),
                    ]);

                    const votesData = await votesRes.json();
                    const locationData = await locationRes.json();

                    return {
                        ...meetup,
                        averageRating: votesData?.average || 0, // Valoración media
                        location: locationData.data || {}, // Asigna el objeto de ubicación
                    };
                });

                const enrichedData = await Promise.all(additionalDataPromises);

                setResults(enrichedData); // Actualizamos el estado con datos enriquecidos
                setLoading(false); // Termina de cargar después de obtener los meetups
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchMeetups(); // Obtener los meetups
    }, [qry]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const imagePromises = results.map(async (meetup) => {
                    const response = await fetch(
                        `${URL_BACK}/meetups/${meetup.id}/photos`
                    );
                    const imagesData = await response.json();
                    console.log(imagesData.data); // Asegúrate de que las imágenes están siendo devueltas

                    // Si hay imágenes, seleccionamos la primera (o la lógica que prefieras)
                    const imageUrl =
                        imagesData.data.length > 0
                            ? `${URL_BACK}/uploads/${imagesData.data[0].name}`
                            : '/meetupPhotoDefault.jpg'; // Usamos la imagen por defecto si no hay imágenes

                    return {
                        [meetup.id]: imageUrl,
                    };
                });

                const imagesArray = await Promise.all(imagePromises);
                const imagesObj = imagesArray.reduce(
                    (acc, curr) => ({ ...acc, ...curr }),
                    {}
                );
                setImages(imagesObj); // Almacenamos todas las imágenes en el estado
            } catch (err) {
                console.log(err);

                setError('Error fetching images');
            }
        };

        if (results.length > 0) {
            fetchImages(); // Obtener las imágenes después de obtener los meetups
        }
    }, [results]); // Solo ejecuta esto cuando los results cambian

    /* useEffect(() => {
        //obtenemos TODAS las asistencias
        fetch(`http://localhost:3000/attendance`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Error fetching attendance data');
                }
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setAttendance(data.data); //guardamos las asistencias
            });

        //obtenemos TODOS los votos de un meetup
        fetch(`http://localhost:3000/votesMeetup`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Error fetching votes meetup data');
                }
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setVotes(data.data); //guardamos los votos en el estado
            });
    }, []); //se ejecuta cuando se carga el componente */

    /*     useEffect(() => {
        // Combinar las asistencias y los votos
        const combinedRatings = attendance
            .filter((sesion) => sesion.meetupId === meetupId) // Filtrar las asistencias para el meetup específico
            .map((sesion) => {
                // Buscar los votos relacionados con esta asistencia
                const sessionVotes = votes.filter(
                    (voto) => voto.attendanceId === sesion.id
                );
                return {
                    userId: sesion.userId,
                    date: sesion.date,
                    sessionVotes,
                };
            });

        setResults(combinedRatings); // Guardar las valoraciones combinadas
    }, [attendance, votes]); */

    // Mostrar cargando o error
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="home" id="seccionObjetivo">
            <div id="filtrosHome">
                <Filters />
                <SortFilter />
            </div>
            <div className="categories">
                <Category />
            </div>
            <h3>Eventos cerca de tu ciudad</h3>
            <ul>
                {results.length > 0 ? (
                    results
                        .filter((meetup) => meetup.validated)
                        .map((meetup) => (
                            <li key={meetup.id}>
                                <Link to={`/meetup/${meetup.id}`}>
                                    <MeetupCard
                                        title={meetup.title}
                                        startDate={meetup.startDate}
                                        hourMeetup={meetup.hourMeetup}
                                        aforoMax={meetup.aforoMax}
                                        image={images[meetup.id]}
                                        dayOfTheWeek={
                                            meetup.dayOfTheWeek
                                                .charAt(0)
                                                .toUpperCase() +
                                            meetup.dayOfTheWeek.slice(1)
                                        }
                                        averageRating={meetup.averageRating}
                                        location={meetup.location} // Objeto único correctamente asignado
                                    />
                                </Link>
                            </li>
                        ))
                ) : (
                    <p>No se encontraron meetups.</p>
                )}
            </ul>
        </div>
    );
}

export default Home;
