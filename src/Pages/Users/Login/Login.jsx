//Página para el inicio de sesión del usuario
import { useUser } from '../../../UserContext.jsx';
import './Login.css';

function Login() {
    const [user, setUser] = useUser(); //importamos el contexto de usuario
    return <div>Login</div>;
}

export default Login;
