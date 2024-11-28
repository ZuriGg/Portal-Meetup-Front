import React, { useState } from 'react';
import './OutOfService.css';
import { useUser } from '../../UserContext.jsx';

const OutOfService = ({ attendanceId }) => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [user] = useUser();
    const handleCancelMeetup = async () => {
        const cancelAttendanceData = await fetch(
            `http://localhost:3000/attendance/${attendanceId}/outservice`,
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
