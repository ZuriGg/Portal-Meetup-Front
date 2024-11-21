import { useEffect, useState } from 'react';
import { useUser } from '../../UserContext.jsx';

export const RatingList = () => {
    const [user] = useUser();
    const [ratings, setRatings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRatings = async () => {
            try {
                setLoading(true);
                setError(null);
                //petición GET para coger los votos del usuario autenticado
                const response = await fetch(
                    'http://localhost:3000/users/votes',
                    {
                        method: 'GET', //no hay que poner método GET??
                        headers: {
                            'Content-Type': 'application/json',
                            ...(user?.token && {
                                Authorization: `${user.token.token}`,
                            }),
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error(
                        'Error al obtener las valoraciones del usuario'
                    );
                }

                const data = await response.json();
                setRatings(data.votes);
            } catch (error) {
                setError(`Error: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchRatings();
    }, [user?.token.token]);

    if (loading) return <p>Cargando valoraciones...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Mis valoraciones:</h2>
            {ratings.length > 0 ? ( //comprobar que hay valoraciones
                <ul>
                    {ratings.map((rating) => (
                        <li key={rating.id}>
                            <p>
                                <strong>Puntuación:</strong>{' '}
                                {Array(rating.value).fill('⭐').join('')}
                            </p>
                            <p>
                                <strong>Comentario:</strong>{' '}
                                {rating.coment || 'Sin comentario'}
                            </p>
                            <p>
                                <strong>Fecha:</strong>{' '}
                                {new Date(
                                    rating.createdAt
                                ).toLocaleDateString()}
                            </p>
                            <p>
                                <strong>Evento:</strong> {rating.meetupTitle}
                            </p>
                        </li>
                    ))}
                </ul>
            ) : (
                //si no hay valoraciones en este usuario q entrega el token
                <p>Todavía no ha realizado ninguna valoración.</p>
            )}
        </div>
    );
};
