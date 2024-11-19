import './MeetupsListCard.css';
import React from 'react';

function MeetupsAsists({ h3 }) {
    return (
        <div id="meetupListCard">
            <h3>{h3}</h3>
            <div id="listaMeetups"></div>
            <p>Lógica que muestre los meetups</p>
        </div>
    );
}

export default MeetupsAsists;
