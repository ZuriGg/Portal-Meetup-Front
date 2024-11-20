import React /* { useState, useEffect } */ from 'react';
import { Navigate } from 'react-router-dom';
import './Profile.css';
import ProfileCard from '../../../Components/UserProfile/ProfileCard.jsx';
import MeetupsListCard from '../../../Components/UserProfile/MeetupsListCard.jsx';
import { useUser } from '../../../UserContext.jsx';

function Profile() {
    /* const [userAvatar, setUserAvatar] = useState('');
    const [userFirstName, setUserFirstName] = useState('');
    const [userLastname, setUserLastname] = useState('');
    const [userUsername, setUserUsername] = useState('');
    const [userEmail, setUserEmail] = useState('');
    useEffect(() => {
        const sessionData = JSON.parse(localStorage.getItem('session'));
        if (sessionData) {
            const { avatar, firstName, lastname, username, email } =
                sessionData;
            setUserAvatar(avatar);
            setUserFirstName(firstName);
            setUserLastname(lastname);
            setUserUsername(username);
            setUserEmail(email);
        }
    }, []);

    if (!isLoggedIn) {
        return <Navigate to="/" />; // Redirección condicional
    } */
    const [user] = useUser();

    if (!user?.token) {
        return <Navigate to="/" />;
    }

    return (
        <div id="profileContainer">
            <ProfileCard
                email={user.email}
                avatar={user.avatar}
                firstName={user.firstName}
                lastname={user.lastname}
                username={user.username}
            />
            <div id="listaMeetupsUsuario">
                <MeetupsListCard h3="Meetups a los que asistes" />
                <MeetupsListCard h3="Meetups creados por ti" />
            </div>
        </div>
    );
}

export default Profile;
