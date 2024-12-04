import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const URL_BACK = import.meta.env.VITE_URL_BACK;

import './UserCard.css';

function UserCard({ avatar, username, activatedButton }) {
    return (
        <div className="userCard">
            <img
                src={
                    !avatar
                        ? '/avatarDefault.webp'
                        : `${URL_BACK}/uploads/${avatar}`
                }
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
    avatar: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    activatedButton: PropTypes.bool,
};
