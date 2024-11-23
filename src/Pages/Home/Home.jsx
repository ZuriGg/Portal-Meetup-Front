import './Home.css';
import { useEffect, useState } from 'react';
import { useUser } from '../../UserContext.jsx';
import MeetupCard from '../../Components/MeetupCard/MeetupCard.jsx';
import { useMeetup } from '../../MeetupContext.jsx';
import Category from '../../Components/Home/Category.jsx';

function Home() {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user] = useUser();

    useEffect(() => {
        if (qry) {
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

    // Mostrar cargando o error
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    console.log('User token:', user?.token);

    return (
        <div className="home">
            <h1>Chupala noi</h1>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel eos
                ab adipisci facilis amet eaque quas placeat iusto deserunt alias
                optio illum, reiciendis omnis tempora commodi repudiandae dolore
                provident perferendis? Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Vel eos ab adipisci facilis amet eaque quas
                placeat iusto deserunt alias optio illum, reiciendis omnis
                tempora commodi repudiandae dolore provident perferendis? Lorem
                ipsum dolor sit amet consectetur adipisicing elit. Vel eos ab
                adipisci facilis amet eaque quas placeat iusto deserunt alias
                optio illum, reiciendis omnis tempora commodi repudiandae dolore
                provident perferendis? Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Vel eos ab adipisci facilis amet eaque quas
                placeat iusto deserunt alias optio illum, reiciendis omnis
                tempora commodi repudiandae dolore provident perferendis? Lorem
                ipsum dolor sit amet consectetur adipisicing elit. Vel eos ab
                adipisci facilis amet eaque quas placeat iusto deserunt alias
                optio illum, reiciendis omnis tempora commodi repudiandae dolore
                provident perferendis? Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Vel eos ab adipisci facilis amet eaque quas
                placeat iusto deserunt alias optio illum, reiciendis omnis
                tempora commodi repudiandae dolore provident perferendis? Lorem
                ipsum dolor sit amet consectetur adipisicing elit. Vel eos ab
                adipisci facilis amet eaque quas placeat iusto deserunt alias
                optio illum, reiciendis omnis tempora commodi repudiandae dolore
                provident perferendis?
            </p>
            <h3>Eventos cerca de tu ciudad</h3>
            <ul>
                {results.length > 0 ? (
                    results
                        .filter((meetup) => meetup.validated)
                        .map((meetup) => (
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
            <div className="categories">
                <Category />
            </div>
        </div>
    );
}

export default Home;
