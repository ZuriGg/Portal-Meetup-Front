import { Navigate } from 'react-router-dom';
import { useUser } from '../../../UserContext';
import './AdminPage.css';
import React from 'react';

function AdminPage() {
    const [user] = useUser();

    if (!user?.token) {
        return <Navigate to="/" />;
    }

    if (user.role !== 'admin') {
        return <Navigate to="/" />;
    }

    return (
        <div>
            <p>admin</p>
        </div>
    );
}

export default AdminPage;
