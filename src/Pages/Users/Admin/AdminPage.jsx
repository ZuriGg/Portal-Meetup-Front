import { Navigate } from 'react-router-dom';
import { useUser } from '../../../UserContext.jsx';
import AdminValidateCard from '../../../Components/AdminValidate/AdminValidateCard.jsx';

import './AdminPage.css';
function AdminPage() {
    const [user] = useUser();

    if (!user?.token) {
        return <Navigate to="/" />;
    }

    if (user.role !== 'admin') {
        return <Navigate to="/" />;
    }

    return (
        <div id="adminPage">
            <AdminValidateCard titulo="Meetups para validar" url="meetups" />
        </div>
    );
}

export default AdminPage;
