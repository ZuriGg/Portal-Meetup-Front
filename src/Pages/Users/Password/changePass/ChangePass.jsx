import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './ChangePass.css';
import { useUser } from '../../../../UserContext.jsx';

export default function ChangePass() {
    // const [email, setEmail] = useState(''); --> NO HACE FALTA PORQUE LO IMPORTAMOS DESDE EL USERCONTEXT
    const [recoverPassCode, setRecoverPassCode] = useState('');
    const [newPass, setNewPass] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    // Usamos el contexto de usuario
    const [user] = useUser();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);
        const res = await fetch('http://localhost:3000/users/password', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: user.email, //usamos el email del usuario logueado
                recoverPassCode,
                newPass,
            }),
        });
        const json = await res.json();
        if (res.ok) {
            setSuccess(true);
            setTimeout(() => navigate('/user/login'), 2000); //en 2 segundos se redirige a la página de LOGIN
        } else {
            setError(
                json.error ||
                    'error al enviar la solicitud de cambio de contraseña'
            );
        }
    };

    return (
        <>
            <h1>Página de cambio de contraseña</h1>
            <p>
                Inserte {/* su correo electrónico,*/} su código de contraseña y
                su nueva contraseña
            </p>
            <div id="recover" className="areaFormulario">
                <form onSubmit={handleSubmit}>
                    <label>
                        Código de cambio de contraseña:
                        <input
                            type="text"
                            name="recoverPass"
                            value={recoverPassCode}
                            onChange={(e) => setRecoverPassCode(e.target.value)}
                        />
                    </label>
                    <label>
                        Nueva contraseña:
                        <input
                            type="password"
                            name="newPass"
                            value={newPass}
                            onChange={(e) => setNewPass(e.target.value)}
                        />
                    </label>
                    <button>✔</button>
                    {success && <p>Cambio de contraseña realizada</p>}
                    {error && <p>{error}</p>}
                </form>
            </div>
        </>
    );
}
