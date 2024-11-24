import './MeetupsOwnerCard.css';
import MeetupCard from '../MeetupCard/MeetupCard.jsx';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useUser } from '../../UserContext.jsx';
import { Link } from 'react-router-dom';

function MeetupsOwnerCard({ titulo, url }) {
    const [results, setResults] = useState([]);
    const [user] = useUser();

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
                    results?.map((meetup) => {
                        if (meetup.userId !== user.id) {
                            return null;
                        }
                        return (
                            <li key={meetup.id}>
                                <Link to={`/meetup/${meetup.id}`}>
                                    <MeetupCard
                                        title={meetup.title}
                                        description={meetup.description}
                                        startDate={meetup.startDate}
                                        hourMeetup={meetup.hourMeetup}
                                        aforoMax={meetup.aforoMax}
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
