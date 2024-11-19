import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './ChangePass.css';

export default function ChangePass() {
    const [recoverPassCode, setRecoverPassCode] = useState('');
    const [newPass, setNewPass] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

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
            <p>Inserte su código de contraseña y su nueva contraseña</p>
            <div id="recover" className="page">
                <form onSubmit={handleSubmit}>
                    <label>
                        <span>Código de cambio de contraseña:</span>
                        <input
                            type="text"
                            name="recoverPass"
                            value={recoverPassCode}
                            onChange={(e) => setRecoverPassCode(e.target.value)}
                        />
                    </label>
                    <label>
                        <span>Nueva contraseña:</span>
                        <input
                            type="password"
                            name="newPass"
                            value={newPass}
                            onChange={(e) => setNewPass(e.target.value)}
                        />
                        {/* MODIFICAR PARA QUE APAREZCAN DOS CAMPOS DE NUEVA CONTRASEÑA Y QUE SE COMPARE DESDE EL MISMO FRONT. LLEVARSE DE REGISTER.JSX */}
                        <button>✔</button>
                        {success && <p>Cambio de contraseña realizada</p>}
                        {error && <p>{error}</p>}
                    </label>
                </form>
            </div>
        </>
    );
}
