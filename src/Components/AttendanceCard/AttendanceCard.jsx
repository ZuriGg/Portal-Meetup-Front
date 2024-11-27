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
    date: PropTypes.oneOfType([
        PropTypes.string, // Si la fecha se pasa como texto (por ejemplo, "2024-11-27").
        PropTypes.instanceOf(Date), // Si la fecha se pasa como un objeto de tipo Date.
    ]).isRequired, // Es requerido porque el componente siempre espera una fecha.
};
