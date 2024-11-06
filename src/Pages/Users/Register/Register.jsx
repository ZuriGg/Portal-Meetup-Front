// Página para el registro de usuario
import { useUser } from "../../../UserContext.jsx";
import "./Register.css";

function Register() {
  const [user, setUser] = useUser(); //importamos el contexto de usuario
  return <div>Register</div>;
}

export default Register;
