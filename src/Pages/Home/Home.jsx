import { useEffect, useState } from 'react';
import { useUser } from '../../UserContext.jsx';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import MeetupCard from '../../Components/MeetupCard/MeetupCard.jsx';

function Home() {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, , handleLogout] = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:3000/meetups')
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Error fetching data');
                }
                return res.json(); // Convierte la respuesta en JSON
            })
            .then((data) => {
                console.log(data); // Verifica si los datos están correctamente en la propiedad 'data'
                setResults(data.data); // Ahora accedemos a 'data' directamente(era lo que nos fallaba sergio, la res de la api es data)
                setLoading(false); // Termina la carga
            })
            .catch((err) => {
                setError(err.message); // Maneja errores
                setLoading(false);
            });
    }, []); // Solo se ejecuta una vez cuando el componente se monta

    console.log(results); // Verifica el valor de `results` en la consola

    // Mostrar cargando o error
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    console.log('User token:', user?.token);

    return (
        <div className="home">
            <h1>Home</h1>
            <img src="" alt="logo" className="logo" />
            {user.token ? (
                <button className="buttonLogout" onClick={handleLogout}>
                    Cerrar sesión
                </button>
            ) : (
                <>
                    <button
                        className="buttonSingup"
                        onClick={() => navigate('/user/login')}
                    >
                        Iniciar sesión
                    </button>
                    <button
                        className="buttonRegister"
                        onClick={() => navigate('/user/register')}
                    >
                        Registrarse
                    </button>
                </>
            )}

            <p>PORTAL MEETUP</p>
            <p>Proyecto rechuloooooo...</p>
            <h2>Eventos cerca de tu ciudad</h2>
            <ul>
                {results.length > 0 ? ( //comprobamos si la data que nos manda la api no esta vacia y mapeamos si la hay
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

export default Home;
