import { useState } from 'react';
import { useUser } from '../../UserContext.jsx';
import PropTypes from 'prop-types';
import './OutOfService.css';

const URL_BACK = import.meta.env.VITE_URL_BACK;

const OutOfService = ({ attendanceId }) => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [user] = useUser();
    const handleCancelMeetup = async () => {
        const cancelAttendanceData = await fetch(
            `${URL_BACK}/attendance/${attendanceId}/outservice`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: user.token.token,
                },
            }
        );
        if (cancelAttendanceData) {
            setIsCancelled(true);
        }
    };

    return (
        <div className="outOfService">
            {isCancelled ? (
                <p> 🚫🔊❌ Evento anulado ❌🔊🚫 </p>
            ) : (
                <button onClick={handleCancelMeetup} className="cancelButton">
                    Pulsa botón para cancelar la sesión seleccionada
                </button>
            )}
        </div>
    );
};

export default OutOfService;

OutOfService.propTypes = {
    attendanceId: PropTypes.node,
};
