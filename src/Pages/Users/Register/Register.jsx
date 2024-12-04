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

    const URL_BACK = import.meta.env.VITE_URL_BACK;

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            if (password !== confirmPassword) {
                setError('las contraseñas no son exactamente iguales');
                return;
            }
            const res = await fetch(`${URL_BACK}/users/register`, {
                method: 'POST', //se envían los datos al servidor mediante POST
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    //convertimos los datos a JSON
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

            setSuccess(true); //operación exitosa
            setError(null);
            // setTimeout(() => navigate('/user/validate'), 1000);
        } catch (error) {
            console.error('Error al registrar el usuario:', error);
            setError(`Error al registrar el usuario `, error);
        }
    };

    return (
        <div className="areaFormulario">
            <h3>Registro de Usuario</h3>
            <form onSubmit={handleRegister}>
                <label>
                    Nombre de usuario:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Nickname"
                        required
                    />
                </label>
                <label>
                    Nombre:
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Nombre"
                        required
                    />
                </label>
                <label>
                    Apellido:
                    <input
                        type="text"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        placeholder="Apellido"
                        required
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                    />
                </label>
                <label>
                    Contraseña:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Contraseña"
                        required
                    />
                </label>
                <label>
                    Confirmar contraseña:
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirme contraseña"
                        required
                    />
                </label>
                <button type="submit">Registrarse</button>
                {success && (
                    <p>Se ha registrado correctamente, revise su email</p>
                )}
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

export default Register;
