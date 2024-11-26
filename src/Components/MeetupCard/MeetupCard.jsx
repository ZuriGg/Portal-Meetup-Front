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
                src={image || '/meetupPhotoDefault.jpg'} // Usa la imagen pasada como prop o la imagen por defecto
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
    image: PropTypes.string, // Debería ser un string que es la URL de la imagen
    title: PropTypes.string,
    description: PropTypes.string,
    startDate: PropTypes.string,
    hourMeetup: PropTypes.string,
    aforoMax: PropTypes.number,
    inscribirseBoolean: PropTypes.bool,
};
