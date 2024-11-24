import React, { useState } from 'react';
import './OutOfOrder.css';

const OutOfOrder = ({ eventId, cancelEvent }) => {
    const [isCancelled, setIsCancelled] = useState(false)
    const handleCancelEvent = () => {
        cancelEvent(eventId);
        setIsCancelled(true);
    };

    return (
        <div className="outOfOrder">
            {isCancelled ? (
                <p> 🚫🔊❌ Evento anulado ❌🔊🚫  </p>
            ) : (
                <button onClick={handleCancelEvent} className="cancelButton">
                    Fumáte el evento Sergio, fumátelo!!!!
                </button>
            )
        }
        </div>
    )
 }


export default OutOfOrder;