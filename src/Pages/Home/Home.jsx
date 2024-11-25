import './Home.css';
import { useEffect, useState } from 'react';
import { useUser } from '../../UserContext.jsx';
import MeetupCard from '../../Components/MeetupCard/MeetupCard.jsx';
import { useMeetup } from '../../MeetupContext.jsx';
import Category from '../../Components/Home/Category.jsx';
import { Link } from 'react-router-dom';

function Home() {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [votes, setVotes] = useState([]); //para gestionar los votos
    const [attendance, setAttendance] = useState([]); //para gestionar las asistencias
    const [user] = useUser();
    const { qry } = useMeetup();
    let meetupId;
    console.log(meetupId);

    console.log(qry);

    useEffect(() => {
        if (qry) {
            //el minVotes esta siendo undefiend
            fetch(`http://localhost:3000/meetups?${qry}`)
                .then((res) => {
                    if (!res.ok) {
                        throw new Error('Error fetching data');
                    }
                    return res.json();
                })
                .then((data) => {
                    console.log('Datos recibidos:', data);
                    setResults(data.data || []);
                    setLoading(false);
                })
                .catch((err) => {
                    setError(err.message);
                    setLoading(false);
                });
        } else {
            fetch(`http://localhost:3000/meetups`)
                .then((res) => {
                    if (!res.ok) {
                        throw new Error('Error fetching data');
                    }
                    return res.json();
                })
                .then((data) => {
                    console.log('Datos recibidos:', data);
                    setResults(data.data || []);
                    setLoading(false);
                })
                .catch((err) => {
                    setError(err.message);
                    setLoading(false);
                });
        }
    }, [qry]);

    console.log(results);

    useEffect(() => {
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
    }, [attendance, votes]);

    // Mostrar cargando o error
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    console.log('User token:', user?.token);

    return (
        <div className="home">
            <h1>OurMeet</h1>
            <h2>nuestro lugar de encuentro</h2>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel eos
                ab adipisci facilis amet eaque quas placeat iusto deserunt alias
                optio illum, reiciendis omnis tempora commodi repudiandae dolore
                provident perferendis? Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Vel eos ab adipisci facilis amet eaque quas
                placeat iusto deserunt alias optio illum, reiciendis omnis
                tempora commodi repudiandae dolore provident perferendis? Lorem
                ipsum dolor sit amet consectetur adipisicing elit. Vel eos ab
                adipisci facilis amet e
            </p>
            <h3>Eventos cerca de tu ciudad</h3>
            <ul>
                {results.length > 0 ? (
                    results
                        .filter((meetup) => meetup.validated)
                        .map(
                            (meetup) => (
                                (meetupId = meetup.id),
                                (
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
                                )
                            )
                        )
                ) : (
                    <p>No se encontraron meetups.</p>
                )}
            </ul>
            <div className="categories">
                <Category />
            </div>
        </div>
    );
}

export default Home;
