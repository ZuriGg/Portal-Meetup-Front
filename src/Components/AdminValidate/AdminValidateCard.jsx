import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useUser } from '../../UserContext.jsx';

import './AdminValidateCard.css';

function AdminValidateCard({ titulo, url }) {
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
                setResults(data.data);
            })
            .catch((error) => console.error('Error fetching meetups:', error));
    }, [url]);

    const handleClick = async (meetupId, currentValidated) => {
        try {
            const newValidated = !currentValidated; // Invertir el valor actual

            const response = await fetch(
                `http://localhost:3000/meetups/${meetupId}/validate`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${user.token.token}`,
                    },
                    body: JSON.stringify({ validated: newValidated }),
                }
            );

            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }

            setResults((prevResults) =>
                prevResults.map((meetup) =>
                    meetup.id === meetupId
                        ? { ...meetup, validated: newValidated }
                        : meetup
                )
            );
        } catch (error) {
            console.error('Error al validar la meetup:', error);
        }
    };

    return (
        <div className="adminValidateCard">
            <h3>{titulo}</h3>
            <ul>
                {results.length > 0 ? (
                    results.map((meetup) => (
                        <li key={meetup.id}>
                            <div>
                                <Link to={`meetup/${meetup.id}`}>
                                    <h4>{meetup.title}</h4>
                                    <p>{meetup.description}</p>
                                </Link>
                                <button
                                    onClick={() =>
                                        handleClick(meetup.id, meetup.validated)
                                    }
                                >
                                    {meetup.validated ? 'Invalidar' : 'Validar'}
                                </button>
                            </div>
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

AdminValidateCard.propTypes = {
    titulo: PropTypes.node,
    url: PropTypes.node,
};
