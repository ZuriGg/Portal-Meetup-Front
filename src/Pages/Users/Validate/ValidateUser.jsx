// Página para mostrar feedback al usuario al verificar su registro
import { useUser } from '../../../UserContext';
import './ValidateUser.css';

function ValidateUser() {
    const [user, setUser] = useUser(); //importamos el contexto de usuario
    return <div>ValidateUser</div>;
}

export default ValidateUser;
