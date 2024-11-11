// Página para el registro de usuario
import { useUser } from '../../../UserContext.jsx';
import './Register.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
        setError('Las contraseñas no coinciden');
        return;
        }

        try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'app/json' 
            },
            body: JSON.stringify({
                username,
                email,
                password
            })
            
        });
        setSuccess('Usuario registrado con éxito');
        setError('');
        } catch (error) {
        setError('Error al registrar el usuario');
        }
    };

    return (
        <div className="register-container">
        <h2>Registro de Usuario</h2>
        <form onSubmit={handleRegister}>
            <div>
            <label>Nombre de Usuario:</label>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            </div>
            <div>
            <label>Email:</label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            </div>
            <div>
            <label>Contraseña:</label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            </div>
            <div>
            <label>Confirmar Contraseña:</label>
            <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
            />
            </div>
            <button type="submit">Registrarse</button>
        </form>
        </div>
    );
};

export default Register;
