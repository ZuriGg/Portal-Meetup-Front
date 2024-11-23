import { Link } from 'react-router-dom';
import './UserCard.css';
import React from 'react';

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
