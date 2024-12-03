import PropTypes from 'prop-types';
import './MeetupCard.css';

function MeetupCard({
    image,
    title,
    dayOfTheWeek,
    startDate,
    hourMeetup,
    aforoMax,
    averageRating,
    location,
}) {
    return (
        <div className="meetupsCard">
            <img
                src={image || '/meetupPhotoDefault.jpg'}
                alt="imagen de un meetup"
            />
            <h4>{title}</h4>
            <p>
                {dayOfTheWeek} - {new Date(startDate).toLocaleDateString()} -{' '}
                {hourMeetup}
            </p>
            <p>{averageRating}</p>
            <p>{/* location */}</p>

            <p>Aforo máximo: {aforoMax}</p>
        </div>
    );
}

export default MeetupCard;

MeetupCard.propTypes = {
    image: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    startDate: PropTypes.string,
    hourMeetup: PropTypes.string,
    aforoMax: PropTypes.number,
    inscribirseBoolean: PropTypes.bool,
    dayOfTheWeek: PropTypes.string,
};
