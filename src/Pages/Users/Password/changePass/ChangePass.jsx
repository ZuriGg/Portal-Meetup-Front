import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './ChangePass.css';

//NO SE ACTUALIZA LA NUEVA CONTRASEÑA
export default function ChangePass() {
    const [recoverPassCode, setRecoverPassCode] = useState('');
    const [newPass, setNewPass] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        //que las contraseñas coincidan:
        if (newPass !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        const res = await fetch('http://localhost:3000/users/password', {
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
            setTimeout(() => navigate('/user/login'), 2000); //en 2 segundos te redirige a la página de LOGIN
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
            <p>Inserte su contraseña actual y su nueva contraseña</p>
            <div id="recover" className="page">
                <form onSubmit={handleSubmit}>
                    <label>
                        <span>Contraseña actual:</span>
                        <input
                            type="password"
                            name="oldPass"
                            value={recoverPassCode}
                            placeholder="Contraseña actual"
                            onChange={(e) => setRecoverPassCode(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        <span>Nueva contraseña:</span>
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
        </>
    );
}
