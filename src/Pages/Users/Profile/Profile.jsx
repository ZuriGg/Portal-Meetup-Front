import './Profile.css';
import React /* { useState, useEffect } */ from 'react';
import { Navigate } from 'react-router-dom';
import ProfileCard from '../../../Components/UserProfile/ProfileCard.jsx';
import MeetupsListCard from '../../../Components/UserProfile/MeetupsListCard.jsx';
import { useUser } from '../../../UserContext.jsx';
import UserCard from '../../../Components/UserCard/UserCard.jsx';

function Profile() {
    const [user] = useUser();

    if (!user?.token) {
        return <Navigate to="/" />;
    }

    return (
        <div id="profileContainer">
            <div id="panelesUsuario">
                <ProfileCard
                    email={user.email}
                    avatar={user.avatar}
                    firstName={user.firstName}
                    lastname={user.lastname}
                    username={user.username}
                    location={user.location}
                />
                <UserCard
                    avatar={user.avatar}
                    username={user.username}
                    activatedButton={true}
                />
            </div>
            <div id="listaMeetupsUsuario">
                <MeetupsListCard
                    titulo="Meetups a los que asistes"
                    url="meetups"
                />
                <MeetupsListCard
                    titulo="Meetups creados por ti"
                    url="meetups"
                />
            </div>
        </div>
    );
}

export default Profile;
