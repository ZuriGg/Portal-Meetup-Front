import PropTypes from 'prop-types';
import './AttendanceCard.css';

//recibe como argumento date --> hacemos un map que recorra todas las fechas
function AttendanceCard({ date }) {
    return (
        <div className="attendanceComponent">
            <p>{date}</p>
        </div>
    );
}

export default AttendanceCard;

AttendanceCard.propTypes = {
    date: PropTypes.node,
};
