import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Validate() {
    const navigate = useNavigate();
    const [error, setError] = useState(null); //añadimos estados para error

    const handleclick = () => {
        try {
            // Aquí podrías hacer alguna validación adicional o llamada a un API si es necesario.
            navigate('/user/login');
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
