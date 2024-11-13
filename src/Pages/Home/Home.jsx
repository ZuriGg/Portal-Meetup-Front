import { useEffect, useState } from 'react';
import './Home.css';

function Home() {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    return (
        <div className="home">
            <h1>Home</h1>
            <img src="" alt="logo" className="logo" />
            <h2>Iniciar sesión</h2>
            <h2>Registrarse</h2>
            <p>PORTAL MEETUP</p>
            <p>Proyecto rechuloooooo...</p>
            <h2>Eventos cerca de tu ciudad</h2>
            <ul>
                {results.length > 0 ? ( //comprobamos si la data que nos manda la api no esta vacia y mapeamos si la hay
                    results?.map((meetup) => (
                        <li key={meetup.id}>
                            <div className="meetups-entries">
                                <div
                                    className="prueba-foto-meetup"
                                    style={{ backgroundColor: 'blue' }}
                                ></div>
                                <h3>{meetup.title}</h3>
                                <p>{meetup.description}</p>
                                <p>
                                    <strong>Fecha de inicio:</strong>{' '}
                                    {new Date(
                                        meetup.startDate
                                    ).toLocaleDateString()}
                                </p>
                                <p>
                                    <strong>Hora:</strong> {meetup.hourMeetup}
                                </p>
                                <p>
                                    <strong>Afóro máximo:</strong>{' '}
                                    {meetup.aforoMax}
                                </p>
                                <button>inscribete</button>
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

export default Home;
