import { useState } from 'react';
import { useUser } from '../../../UserContext.jsx';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const [, setUser] = useUser();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:3000/users/login', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                setError('El usuario o la contraseña no son válidos');
                return;
            }

            const data = await res.json();

            console.log(' data recibida del server ', data);

            setUser({ token: data.token });

            console.log(data.token);

            setSuccess(true);
            setError(null);
            setTimeout(() => navigate('/'), 1000);
        } catch (error) {
            setError('Ocurrió un error al iniciar sesión');
            console.error('Error en el login:', error);
        }
    };

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
                {success && <p>Login hecho correctamente</p>}
                {error && <p>{error}</p>}
            </form>
        </>
    );
}

export default Login;

// DESDE EL BACK TE PIDE:
// email, password
