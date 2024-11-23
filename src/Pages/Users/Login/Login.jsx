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

            // Obtenemos la ubicación
            let userLocation = { city: 'Desconocida', region: '', country: '' };
            try {
                const locationRes = await fetch('https://ipapi.co/json/');
                const locationData = await locationRes.json();
                userLocation = {
                    city: locationData.city,
                    region: locationData.region,
                    country: locationData.country_name,
                };
            } catch (error) {
                console.error('Error al obtener la ubicación:', error);
            }

            // Guardamos todo el usuario en el contexto
            enhancedSetUser({
                ...dataUser.data.user,
                token: dataToken.token,
                location: userLocation, // Añadimos la ubicación
            });

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
            <div className="areaFormulario">
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
                    {success && <p>Login hecho correctamente</p>}
                    {error && <p>{error}</p>}
                </form>
            </div>
        </>
    );
}

export default Login;

// DESDE EL BACK TE PIDE:
// email, password
