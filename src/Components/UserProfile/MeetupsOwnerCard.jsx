import MeetupCard from '../MeetupCard/MeetupCard.jsx';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useUser } from '../../UserContext.jsx';
import { Link } from 'react-router-dom';

import './MeetupsOwnerCard.css';

function MeetupsOwnerCard({ titulo, url }) {
    const [results, setResults] = useState([]);
    const [user] = useUser();
    const [images, setImages] = useState({});
    const [isLoading, setIsLoading] = useState(true);

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
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            });
    }, [url]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const imagePromises = results.map(async (meetup) => {
                    const response = await fetch(
                        `http://localhost:3000/meetups/${meetup.id}/photos`
                    );
                    const imagesData = await response.json();
                    console.log(imagesData.data);

                    const imageUrl =
                        imagesData.data.length > 0
                            ? `http://localhost:3000/uploads/${imagesData.data[0].name}`
                            : '/meetupPhotoDefault.jpg';

                    return {
                        [meetup.id]: imageUrl,
                    };
                });

                const imagesArray = await Promise.all(imagePromises);
                const imagesObj = imagesArray.reduce(
                    (acc, curr) => ({ ...acc, ...curr }),
                    {}
                );
                setImages(imagesObj);
            } catch (err) {
                console.error('Error fetching meetups:', err);
            } //ARREGLADO
        };

        if (results.length > 0) {
            fetchImages();
        }
    }, [results]);

    if (isLoading) {
        return <p>Cargando contenido...</p>;
    }

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
                                        hourMeetup={
                                            meetup.hourMeetup
                                                ? meetup.hourMeetup
                                                      .split(':')
                                                      .slice(0, 2)
                                                      .join(':')
                                                : 'N/A'
                                        }
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

MeetupsOwnerCard.propTypes = {
    titulo: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
};
