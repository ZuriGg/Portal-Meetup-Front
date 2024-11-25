import './MeetupsAsistsCard.css';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useUser } from '../../UserContext.jsx';
import AttendanceCard from '../AttendanceCard/AttendanceCard.jsx';

function MeetupsListCard({ titulo, url }) {
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
                    results?.map((atendance) => {
                        if (atendance.userId !== user.id) {
                            return null;
                        }
                        return (
                            <li key={atendance.id}>
                                <AttendanceCard
                                    date={
                                        new Date(atendance.date)
                                            .toISOString()
                                            .split('T')[0]
                                    }
                                />
                            </li>
                        );
                    })
                ) : (
                    <p>No se encontraron asistencias.</p>
                )}
            </ul>
        </div>
    );
}

export default MeetupsListCard;

//ESPECIFICAR MEJOR ESTOS PROPTYPES
MeetupsListCard.propTypes = {
    titulo: PropTypes.node,
    url: PropTypes.node,
};
