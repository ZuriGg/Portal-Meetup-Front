import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Validate() {
    const navigate = useNavigate();
    const [error, setError] = useState(null); //añadimos estados para error

    const handleclick = () => {
        try {
            navigate('/user/login'); //si al dar click funciona, que te redirija a la página LOGIN
        } catch {
            setError('Ocurrió un error. Inténtelo de nuevo.');
        }
    };
    return (
        <>
            <h1>Página de validación</h1>
            {error ? (
                <p className="errorMessage">{error}</p>
            ) : (
                <p>Usuario verificado correctamente</p>
            )}
            <button
                className="validateButton"
                type="button"
                onClick={handleclick}
            >
                Iniciar sesión
            </button>
        </>
    );
}

export default Validate;
