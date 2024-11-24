import './AttendanceCard.css';
import React from 'react';

function AttendanceCard({ date }) {
    return (
        <div className="attendanceComponent">
            <p>{date}</p>
        </div>
    );
}

export default AttendanceCard;
