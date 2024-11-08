import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './RecoveryPass.css';

export default function RecoveryPass() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);
        const res = await fetch(
            'http://localhost:3000/users/password/recover',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            }
        );
        const json = await res.json();
        if (res.ok) {
            setSuccess(true);
            setTimeout(() => navigate('/user/password/changepass'), 2000);
        } else {
            setError(
                json.error ||
                    'error al enviar la solicitud de recuperacion de contraseña'
            );
        }
    };

    return (
        <>
            <h1>Recover</h1>
            <p>
                Inserte su correo electrónico, para iniciar el proceso de
                recuperación de contraseña
            </p>
            <div id="recover" className="page">
                <form onSubmit={handleSubmit}>
                    <label>
                        <span>Email: </span>
                        <input
                            type="text"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button>✔</button>
                        {success && <p>correo de recuperación enviado</p>}
                        {error && <p>{error}</p>}
                    </label>
                </form>
            </div>
        </>
    );
}
