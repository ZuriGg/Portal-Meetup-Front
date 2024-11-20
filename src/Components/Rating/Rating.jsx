import { useState } from 'react';
import { useUser } from '../../UserContext.jsx';
import { useParams } from 'react-router-dom';

export const Rating = () => {
    const [user] = useUser();
    const { attendanceId } = useParams(); //obtenemos el attendanceId de los params de la URL
    const [vote, setVote] = useState(0); //user
    const [coment, setComent] = useState(''); //user
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null); // Mensaje de éxito
    const [loading, setLoading] = useState(false); // Estado de carga

    const handleVoteSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await fetch(
                `http://localhost:3000/meetups/${attendanceId}/votes`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${user.token.token}`, // Autenticación
                    },
                    body: JSON.stringify({
                        value: vote,
                        coment: coment,
                    }),
                }
            );
            console.log('el token de rating es: ', user.token.token);

            if (!response.ok) {
                throw new Error('No se pudo enviar el voto.');
            }

            await response.json();
            setSuccess(true); //operación exitosa
            setVote(0); //limpiamos el campo votos
            setComent(''); //limpiamos el campo de comentarios
        } catch (error) {
            setSuccess(false); //operación fallida
            setError(`${error}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div>
                <h2>Vote la sesión del Meetup:</h2>
                <form onSubmit={handleVoteSubmit}>
                    <label>
                        Puntuación (de 1 a 5):
                        <input
                            type="number"
                            min="1"
                            max="5"
                            value={vote}
                            onChange={(e) => setVote(Number(e.target.value))}
                            required
                        />
                    </label>
                    <label>
                        Comentario:
                        <textarea
                            value={coment}
                            onChange={(e) => setComent(e.target.value)}
                            placeholder="Escriba un comentario (opcional):"
                        />
                    </label>
                    <button
                        type="submit"
                        disabled={loading || vote < 1 || vote > 5}
                    >
                        {loading ? 'Enviando voto...' : 'Enviar Voto'}
                    </button>
                    {success && <p>Valoración enviada!!</p>}
                    {error && <p>{error}</p>}
                </form>
            </div>
        </>
    );
};
