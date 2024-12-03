import './MeetupRatingList.css';

import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import UserCard from '../UserCard/UserCard.jsx';

//Lista de valoraciones que ha recibido un Meetup
export const MeetupRatingList = ({ meetupId, setVotos }) => {
    const [results, setResults] = useState([]); //para manejar el resultado final
    const [attendance, setAttendance] = useState([]); //para gestionar las asistencias
    const [votes, setVotes] = useState([]); //para gestionar los votos
    const [allUsers, setAllUsers] = useState([]); //para gestionar todos los usuarios
    const [avgRating, setAvgRating] = useState(0); //para la media de votos

    console.log('MeetupRatingList - Props recibidas:', { meetupId });

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
                    (voto) => voto.attendanceId === sesion.id && voto.value // Solo incluir votos con un valor
                );
                return {
                    userId: sesion.userId,
                    date: sesion.date,
                    sessionVotes,
                };
            })
            .filter((rating) => rating.sessionVotes.length > 0); // Excluir los que no tienen votos

        setResults(combinedRatings); // Guardar las valoraciones combinadas

        // Calcular la media de los votos de este meetup;
        const allVotes = votes
            .filter((voto) =>
                attendance.some(
                    (sesion) =>
                        sesion.id === voto.attendanceId &&
                        sesion.meetupId === meetupId &&
                        voto.value // Solo considerar votos con valor
                )
            )
            .map((voto) => voto.value);

        const average =
            allVotes.length > 0
                ? allVotes.reduce((sum, value) => sum + value, 0) /
                  allVotes.length
                : 0;

        setAvgRating(average.toFixed(2)); // Guardar la media hasta con 2 decimales
        setVotos(average.toFixed(2)); // Actualizar el estado externo
    }, [attendance, votes, meetupId]); // Se ejecuta cuando cambian las asistencias, los votos o el meetup

    return (
        <div id="meetupRatingList">
            <h3>Lista de valoraciones:</h3>
            <h4>
                Valoración media:
                {avgRating > 0
                    ? ` ${avgRating} / 5 ⭐`
                    : 'Todavía nadie ha compartido su valoración'}
            </h4>
            <div id="valorationContainer">
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
                                        avatar={user.avatar} // Avatar del usuario
                                        username={
                                            user.username ||
                                            'Usuario desconocido'
                                        } // Nombre de usuario
                                        activatedButton={false}
                                    />
                                    <div id="datosValoracion">
                                        <p id="fechaAsistencia">
                                            Fecha de asistencia:{' '}
                                            {new Date(
                                                rating.date
                                            ).toLocaleDateString()}
                                        </p>
                                        <h4>Valoraciones:</h4>
                                        {rating.sessionVotes.length > 0 ? (
                                            rating.sessionVotes.map(
                                                (vote, voteIndex) => (
                                                    <div key={voteIndex}>
                                                        <div id="estrellasContainer">
                                                            <p>Puntuación:</p>
                                                            <p id="estrellas">
                                                                {Array(
                                                                    vote.value
                                                                )
                                                                    .fill('⭐')
                                                                    .join('')}
                                                            </p>
                                                        </div>
                                                        <p>
                                                            Comentario:{' '}
                                                            {vote.coment ||
                                                                'Sin comentario'}
                                                        </p>
                                                    </div>
                                                )
                                            )
                                        ) : (
                                            <p>
                                                No hay valoraciones para esta
                                                sesión.
                                            </p>
                                        )}
                                    </div>
                                </li>
                            );
                        })
                    ) : (
                        <p>No se encontraron valoraciones para este meetup.</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

MeetupRatingList.propTypes = {
    meetupId: PropTypes.number,
    setVotos: PropTypes.func,
};
