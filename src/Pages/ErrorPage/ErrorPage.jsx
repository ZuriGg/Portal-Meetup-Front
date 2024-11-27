import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './ErrorPage.css';

export const ErrorPage = ({ error, resetErrorBoundary }) => {
    const navigate = useNavigate();

    // Manejador del click en el botón combinado
    const handleButton = () => {
        //reiniciamos el estado del ErrorBoundary
        resetErrorBoundary();
        //ahora ya nos puede redirigir al menú principal
        navigate('/');
    };

    return (
        <div className="errorPage">
            <h2>🥶Error interno, tipo 500loquequieras🥶</h2>
            <p>
                Lo sentimos, algo ha salido muy mal aquí dentro. Inténtelo de
                nuevo más tarde 🫶
            </p>
            <pre>{error?.message}</pre>

            {/* Botón combinado de redireccionamiento*/}
            <button onClick={handleButton}>
                Volver a la página principal 🏠
            </button>
        </div>
    );
};

ErrorPage.propTypes = {
    error: PropTypes.instanceOf(Error),
    resetErrorBoundary: PropTypes.func,
};
