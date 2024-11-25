import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import UserCard from '../UserCard/UserCard.jsx';

export const MeetupRatingList = ({ meetupId }) => {
    const [results, setResults] = useState([]); //para manejar el resultado final
    const [attendance, setAttendance] = useState([]); //para gestionar las asistencias
    const [votes, setVotes] = useState([]); //para gestionar los votos
    const [allUsers, setAllUsers] = useState([]); //para gestionar todos los usuarios

    meetupId = 1; //hasta que se gestione el código de Jona

    useEffect(() => {
        //obtenemos TODOS los usuarios
        fetch(`http://localhost:3000/users`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Error fetching users data');
                }
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setAllUsers(data.data); //guardamos los usuarios en el estado
            });

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
    }, []); //se ejecuta cuando se carga el componente

    useEffect(() => {
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
    }, [attendance, votes]); // Se ejecuta cuando cambian las asistencias o los votos

    return (
        <div id="meetupRatingList">
            <h3>Lista de valoraciones:</h3>
            <ul>
                {results.length > 0 ? (
                    results.map((rating, index) => {
                        //buscamos al user que hizo la valoración
                        const user = allUsers.find(
                            (user) => user.id === rating.userId
                        );

                        if (!user) {
                            return null; //si no encuentra usuario, no renderizar
                        }

                        return (
                            <li key={index}>
                                <UserCard
                                    avatar={
                                        user.avatar ||
                                        '/interface/avatarDefault.webp'
                                    } // Avatar del usuario
                                    username={
                                        user.username || 'Usuario desconocido'
                                    } // Nombre de usuario
                                    activatedButton={false}
                                />
                                <p>
                                    Fecha de asistencia:{' '}
                                    {new Date(rating.date).toLocaleDateString()}
                                </p>
                                <h4>Valoraciones:</h4>
                                {rating.sessionVotes.length > 0 ? (
                                    rating.sessionVotes.map(
                                        (vote, voteIndex) => (
                                            <div key={voteIndex}>
                                                <p>
                                                    Puntuación:{' '}
                                                    {Array(vote.value)
                                                        .fill('⭐')
                                                        .join('')}
                                                </p>
                                                <p>
                                                    Comentario:{' '}
                                                    {vote.coment ||
                                                        'Sin comentario'}
                                                </p>
                                            </div>
                                        )
                                    )
                                ) : (
                                    <p>No hay valoraciones para esta sesión.</p>
                                )}
                            </li>
                        );
                    })
                ) : (
                    <p>No se encontraron valoraciones para este meetup.</p>
                )}
            </ul>
        </div>
    );
};

MeetupRatingList.propTypes = {
    meetupId: PropTypes.node,
};