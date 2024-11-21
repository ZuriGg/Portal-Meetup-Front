import './Rating.css';
import { useState } from 'react';
import { useUser } from '../../UserContext.jsx';
import { useParams } from 'react-router-dom';

export const Rating = () => {
    const [user] = useUser();
    const { attendanceId } = useParams(); //obtenemos el attendanceId de los params de la URL
    const [vote, setVote] = useState(0);
    const [coment, setComent] = useState('');
    const [hover, setHover] = useState(0); // para manejar el hover
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null); // Mensaje de éxito
    const [loading, setLoading] = useState(false); // Estado de carga
    const emojis = ['🤢', '😔', '😐', '😌', '😍']; //emojis para cada puntuación

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
                        Authorization: `${user.token.token}`, // Autenticación SIN BEARER!
                    },
                    body: JSON.stringify({
                        value: vote,
                        coment: coment,
                    }),
                }
            );
            console.log('el token de rating es: ', user.token.token);

            if (!response.ok) {
                throw new Error('No se pudo enviar el voto!');
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
            <div className="areaFormulario">
                <h2>Vote la sesión del Meetup:</h2>
                <form onSubmit={handleVoteSubmit}>
                    <label>Puntuación (de 1 a 5):</label>
                    <div className="stars">
                        {[1, 2, 3, 4, 5].map((star, index) => (
                            <button
                                type="button"
                                key={star}
                                className={`star ${
                                    star <= (hover || vote) ? 'selected' : ''
                                }`}
                                onClick={() => setVote(star)} // Al hacer clic se selecciona la estrella
                                onMouseEnter={() => setHover(star)} // Cambia el hover al pasar el mouse
                                onMouseLeave={() => setHover(0)} // Restablece el hover al salir
                            >
                                {emojis[index]}
                            </button>
                        ))}
                    </div>
                    <p>Puntuación seleccionada: {vote}</p>

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
                        {loading
                            ? 'Enviando valoración...'
                            : 'Enviar valoración'}
                    </button>
                    {success && <p>Valoración enviada!!</p>}
                    {error && <p>{error}</p>}
                </form>
            </div>
        </>
    );
};
