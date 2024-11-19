import MeetupCard from '../MeetupCard/MeetupCard';
import './MeetupsListCard.css';
import React from 'react';

function MeetupsAsists({ h3 }) {
    return (
        <div id="meetupListCard">
            <h3>{h3}</h3>
            <div id="listaMeetups"></div>
        </div>
    );
}

export default MeetupsAsists;
