// Componente que muestra una previsualización de un meetup (Para mostrar los meetups como resultado en una búsqueda en home, etc)
import PropTypes from 'prop-types';

import './MeetupCard.css';

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

MeetupCard.propTypes = {
    image: PropTypes.node,
    title: PropTypes.node,
    description: PropTypes.node,
    startDate: PropTypes.node,
    hourMeetup: PropTypes.node,
    aforoMax: PropTypes.node,
    inscribirseBoolean: PropTypes.node,
};
