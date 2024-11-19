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
            <img src={image} alt="imagen de un meetup" />
            <h3>{title}</h3>
            <p>{description}</p>
            <p>
                <strong>Fecha de inicio:</strong>{' '}
                {new Date(startDate).toLocaleDateString()}
            </p>
            <p>
                <strong>Hora:</strong> {hourMeetup}
            </p>
            <p>
                <strong>Afóro máximo:</strong> {aforoMax}
            </p>
            {inscribirseBoolean && <button>Inscríbete</button>}
        </div>
    );
}

export default MeetupCard;
