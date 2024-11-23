import './MeetupsListCard.css';
import MeetupCard from '../MeetupCard/MeetupCard';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function MeetupsAsists({ titulo, url }) {
    const [results, setResults] = useState([]);

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

    return (
        <div id="meetupListCard">
            <h3>{titulo}</h3>
            <div id="listaMeetups"></div>
            <ul>
                {results.length > 0 ? (
                    results?.map((meetup) => (
                        <li key={meetup.id}>
                            <MeetupCard
                                title={meetup.title}
                                description={meetup.description}
                                startDate={meetup.startDate}
                                hourMeetup={meetup.hourMeetup}
                                aforoMax={meetup.aforoMax}
                            />
                        </li>
                    ))
                ) : (
                    <p>No se encontraron meetups.</p>
                )}
            </ul>
        </div>
    );
}

export default MeetupsAsists;

//ESPECIFICAR MEJOR ESTOS PROPTYPES
MeetupsAsists.propTypes = {
    titulo: PropTypes.node,
    url: PropTypes.node,
};
