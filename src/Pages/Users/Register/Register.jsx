// Página para el registro de usuario

import { useState } from 'react';
import './Register.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastname, setLastname] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            console.log(username, firstName, lastname, email, password);
            if (password !== confirmPassword) {
                setError('las contraseñas no son exactamente iguales');
                return;
            }
            const res = await fetch('http://localhost:3000/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    firstName,
                    lastname,
                    email,
                    password,
                }),
            });
            if (!res.ok) {
                setError('no se ha podido conectar con el servidor');
                return;
            }

            setSuccess(true);
            setError(null);
            // setTimeout(() => navigate('/user/validate'), 1000);
        } catch (error) {
            console.error('Error al registrar el usuario:', error);
            setError(`Error al registrar el usuario `, error);
        }
    };

    return (
        <div className="register-container">
            <h2>Registro de Usuario</h2>
            <form onSubmit={handleRegister}>
                <label>Nombre de Usuario: </label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="username"
                    required
                />
                <label>firstname: </label>
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="firstname"
                    required
                />
                <label>lastaname: </label>
                <input
                    type="text"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    placeholder="lastaname"
                    required
                />
                <label>email: </label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email"
                    required
                />
                <label>Contraseña: </label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="password"
                    required
                />
                <label>Confirmar Contraseña: </label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="confirm password"
                    required
                />
                <button type="submit">Registrarse</button>
                {success && <p>register hecho correctamente, mira tu correo</p>}
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

export default Register;

//datos que hay en el back para registrar un nuevo usuario:
// username, email, password, firstName, lastname
