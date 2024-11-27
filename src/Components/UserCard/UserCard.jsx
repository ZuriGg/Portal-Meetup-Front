import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './UserCard.css';

function UserCard({ avatar, username, activatedButton }) {
    return (
        <div className="userCard">
            <img
                src={`http://localhost:3000/uploads/${avatar}`}
                alt="avatar de usuario"
            />
            <p>{username}</p>
            {activatedButton ? (
                <button>
                    <Link to="/user/edit">Editar usuario</Link>
                </button>
            ) : null}
        </div>
    );
}

export default UserCard;

UserCard.propTypes = {
    avatar: PropTypes.string.isRequired, // Es una URL relativa o el nombre del archivo, debe ser un string y requerido.
    username: PropTypes.string.isRequired, // Es un texto que representa el nombre de usuario, también requerido.
    activatedButton: PropTypes.bool, // Es un booleano que indica si se muestra el botón o no.
};
