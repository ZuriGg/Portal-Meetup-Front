import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../../UserContext.jsx';
import './ChangePass.css';

export default function ChangePass() {
    const [recoverPassCode, setRecoverPassCode] = useState('');
    const [newPass, setNewPass] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const [, , handleLogout] = useUser(); //importo el logOut desde el contexto
    const URL_BACK = import.meta.env.VITE_URL_BACK;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        //que las contraseñas coincidan:
        if (newPass !== confirmPassword) {
            setError('Las contraseñas proporcionadas no coinciden');
            return;
        }

        const res = await fetch(`${URL_BACK}/users/password`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                recoverPassCode,
                newPass,
            }),
        });

        const json = await res.json();

        if (res.ok) {
            setSuccess(true);

            setTimeout(() => {
                handleLogout();
                navigate('/user/login');
            }, 2000); //en 2 segundos te redirige a la página de LOGIN
        } else {
            setError(
                json.error ||
                    'error al enviar la solicitud de cambio de contraseña'
            );
        }
    };

    return (
        <div className="areaFormulario">
            <h3>Cambio de contraseña</h3>
            <div id="recover" className="areaFormulario">
                <p>
                    Inserte el código de recuperación que le ha llegado a su
                    email, junto a su nueva contraseña
                </p>
                <form onSubmit={handleSubmit}>
                    <label>
                        <span>Código de recuperación:</span>
                        <input
                            type="password"
                            name="oldPass"
                            value={recoverPassCode}
                            placeholder="Pegue aquí su código de recuperación"
                            onChange={(e) => setRecoverPassCode(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Nueva contraseña:
                        <input
                            type="password"
                            name="newPass"
                            value={newPass}
                            placeholder="Nueva contraseña"
                            onChange={(e) => setNewPass(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        <span>Confirmar contraseña:</span>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirme su nueva contraseña"
                            required
                        />
                    </label>
                    <button>✔</button>
                    {success && (
                        <p>Su contraseña ha sido modificada correctamente</p>
                    )}
                    {error && <p>{error}</p>}
                </form>
            </div>
        </div>
    );
}
