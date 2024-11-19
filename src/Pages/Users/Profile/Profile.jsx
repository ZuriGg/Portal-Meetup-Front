import React, { useState, useEffect } from 'react';
import './Profile.css';
import ProfileCard from '../../../Components/UserProfile/ProfileCard';
import MeetupsListCard from '../../../Components/UserProfile/MeetupsListCard';

function Profile() {
    const [userAvatar, setUserAvatar] = useState('');
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

    return (
        <div id="profileContainer">
            <ProfileCard
                email={userEmail}
                avatar={userAvatar}
                firstName={userFirstName}
                lastname={userLastname}
                username={userUsername}
            />
            <div id="listaMeetupsUsuario">
                <MeetupsListCard h3="Meetups a los que asistes" />
                <MeetupsListCard h3="Meetups creados por ti" />
            </div>
        </div>
    );
}

export default Profile;
