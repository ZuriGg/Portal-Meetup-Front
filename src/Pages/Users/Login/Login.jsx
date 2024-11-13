import { useState } from 'react';
import { useUser } from '../../../UserContext.jsx';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { fetchUserData } from '../../../hooks/api.js';

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
            //enviamos info de usuario registrado previamente en la API para que nos devuelva nuestro token "resToken"
            const resToken = await fetch('http://localhost:3000/users/login', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ email, password }), //mandas el email y la pass
            });

            if (!resToken.ok) {
                setError('El usuario o la contraseña no son válidos');
                return;
            }

            const dataToken = await resToken.json(); //almacenamos el token

            //obtenemos los datos del usuario
            const userData = fetchUserData(dataToken.tokenInfo.id);

            if (!userData) {
                throw new Error(
                    'No se pudo obtener la información del usuario'
                );
            }

            //const resUser = await fetch(
            //     `http://localhost:3000/users/${dataToken.tokenInfo.id}`,
            //     {
            //         method: 'GET',
            //         headers: {
            //             'Content-type': 'application/json',
            //         },
            //     }

            //actualizamos el estado del usuario
            setUser({
                //actualizamos el estado del usuario con usuario y token
                dataUser: userData.data.user,
                token: dataToken.token,
            });

            setSuccess(true); //operación exitosa
            setError(null); //limpiamos errores
            setTimeout(() => navigate('/'), 1000); //en 1 segundo redirige --> HOME
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
