import './AdminValidateCard.css';
import MeetupCard from '../MeetupCard/MeetupCard';
import React, { useEffect, useState } from 'react';

function AdminValidateCard({ titulo, url }) {
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
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    return (
        <div className="adminValidateCard">
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

export default AdminValidateCard;
