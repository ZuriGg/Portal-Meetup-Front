import { Navigate } from 'react-router-dom';
import ProfileCard from '../../../Components/UserProfile/ProfileCard.jsx';
import MeetupsAsistsCard from '../../../Components/UserProfile/MeetupsAsistsCard.jsx';
import { useUser } from '../../../UserContext.jsx';
import UserCard from '../../../Components/UserCard/UserCard.jsx';
import MeetupsOwnerCard from '../../../Components/UserProfile/MeetupsOwnerCard.jsx';

import './Profile.css';

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
                />

                <UserCard
                    avatar={user.avatar}
                    username={user.username}
                    activatedButton={true}
                />
            </div>

            <div id="listaMeetupsUsuario">
                <MeetupsAsistsCard
                    titulo="Meetups a los que asistes"
                    url="attendance"
                />

                <MeetupsOwnerCard
                    titulo="Meetups creados por ti"
                    url="meetups"
                />
            </div>
        </div>
    );
}

export default Profile;
