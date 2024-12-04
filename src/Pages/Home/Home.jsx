import './Home.css';
import { useEffect, useState } from 'react';

import MeetupCard from '../../Components/MeetupCard/MeetupCard.jsx';
import { useMeetup } from '../../MeetupContext.jsx';
import Category from '../../Components/Home/Category/Category.jsx';
import Filters from '../../Components/Home/Filters/Filters.jsx';
import { Link } from 'react-router-dom';

function Home() {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const firstView = localStorage.getItem('firstView');

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
                setResults(data.data || []);
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

    // Mostrar cargando o error
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="home" id="seccionObjetivo">
            <div
                id="filtrosHome"
                style={
                    firstView
                        ? {
                              position: 'absolute',
                              top: '4vh',
                              alignSelf: 'center',
                              justifySelf: 'center',
                              width: 'fit-content',
                          }
                        : null
                }
            >
                <Filters />
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
