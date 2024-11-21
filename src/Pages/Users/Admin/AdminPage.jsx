import { Navigate } from 'react-router-dom';
import { useUser } from '../../../UserContext';
import './AdminPage.css';
import React from 'react';
import AdminValidateCard from '../../../Components/AdminValidate/AdminValidateCard';

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
            <AdminValidateCard titulo="Meetups para validar" url="meetups" />
        </div>
    );
}

export default AdminPage;
