import './MeetupsOwnerCard.css';
import MeetupCard from '../MeetupCard/MeetupCard.jsx';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useUser } from '../../UserContext.jsx';
import { Link } from 'react-router-dom';

function MeetupsOwnerCard({ titulo, url }) {
    const [results, setResults] = useState([]);
    const [user] = useUser();
    const [images, setImages] = useState({});

    useEffect(() => {
        fetch(`http://localhost:3000/${url}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Error fetching data');
                }
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setResults(data.data);
            });
    }, []);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const imagePromises = results.map(async (meetup) => {
                    const response = await fetch(
                        `http://localhost:3000/meetups/${meetup.id}/photos`
                    );
                    const imagesData = await response.json();
                    console.log(imagesData.data); // Asegúrate de que las imágenes están siendo devueltas

                    // Si hay imágenes, seleccionamos la primera (o la lógica que prefieras)
                    const imageUrl =
                        imagesData.data.length > 0
                            ? `http://localhost:3000/uploads/${imagesData.data[0].name}`
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
                setError('Error fetching images');
            }
        };

        if (results.length > 0) {
            fetchImages(); // Obtener las imágenes después de obtener los meetups
        }
    }, [results]);

    return (
        <div id="meetupListCard">
            <h3>{titulo}</h3>
            <div id="listaMeetups"></div>
            <ul>
                {results.length > 0 ? (
                    results?.map((meetup) => {
                        if (meetup.userId !== user.id) {
                            return null;
                        }
                        return (
                            <li key={meetup.id}>
                                <Link to={`/meetup/${meetup.id}`}>
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
                                </Link>
                            </li>
                        );
                    })
                ) : (
                    <p>No se encontraron meetups.</p>
                )}
            </ul>
        </div>
    );
}

export default MeetupsOwnerCard;

//ESPECIFICAR MEJOR ESTOS PROPTYPES
MeetupsOwnerCard.propTypes = {
    titulo: PropTypes.node,
    url: PropTypes.node,
};
