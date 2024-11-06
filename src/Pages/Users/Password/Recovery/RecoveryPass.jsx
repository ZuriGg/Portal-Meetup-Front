// Página para que el usuario pueda solicitar un cambio de contraseña
import { useUser } from '../../../../UserContext.jsx';
import './RecoveryPass.css';

function RecoveryPass() {
    const [user, setUser] = useUser(); //importamos el contexto de usuario
    return <div>RecoveryPass</div>;
}

export default RecoveryPass;
