import { useState } from 'react';
import { useUser } from '../../../UserContext.jsx';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const [, enhancedSetUser] = useUser();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const resToken = await fetch('http://localhost:3000/users/login', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!resToken.ok) {
                setError('El usuario o la contraseña no son válidos');
                return;
            }

            const dataToken = await resToken.json();

            const resUser = await fetch(
                `http://localhost:3000/users/${dataToken.tokenInfo.id}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                    },
                }
            );

            if (!resUser.ok) {
                throw new Error('El fetch no se ha realizado correctamente');
            }

            const dataUser = await resUser.json();

            // Se elimina la lógica de obtener la ubicación del usuario

            // Guardamos todo el usuario en el contexto
            enhancedSetUser({
                ...dataUser.data.user,
                token: dataToken.token,
                location: { city: 'Desconocida', region: '', country: '' }, // Valor predeterminado para la ubicación
            });

            setSuccess(true);
            setError(null);
            setTimeout(() => navigate('/'), 100);
        } catch (error) {
            setError('Ocurrió un error al iniciar sesión');
            console.error('Error en el login:', error);
        }
    };

    return (
        <>
            <h1>Login</h1>
            <div className="areaFormulario" id="login">
                <form onSubmit={handleLogin}>
                    <label>
                        Email
                        <input
                            type="email"
                            placeholder="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <label>
                        Contraseña
                        <input
                            type="password"
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <button type="submit">Login</button>
                    <Link to="/user/password/recover">
                        ¿Has olvidado tu contraseña?
                    </Link>
                    {success && <p>Login hecho correctamente</p>}
                    {error && <p>{error}</p>}
                </form>
            </div>
        </>
    );
}

export default Login;
