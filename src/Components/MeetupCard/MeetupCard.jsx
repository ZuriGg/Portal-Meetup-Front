// Componente que muestra una previsualización de un meetup (Para mostrar los meetups como resultado en una búsqueda en home, etc)
import './MeetupCard.css';

import React from 'react';

function MeetupCard({
    image,
    title,
    description,
    startDate,
    hourMeetup,
    aforoMax,
    inscribirseBoolean,
}) {
    return (
        <div className="meetupsCard">
            <img
                src={image || '/meetupPhotoDefault.jpg'}
                alt="imagen de un meetup"
            />
            <h4>{title}</h4>
            <p>{description}</p>
            <p>Fecha de inicio: {new Date(startDate).toLocaleDateString()}</p>
            <p>Hora: {hourMeetup}</p>
            <p>Aforo máximo: {aforoMax}</p>
            {inscribirseBoolean && <button>Inscríbete</button>}
        </div>
    );
}

export default MeetupCard;
