import { Navigate, Route, Routes } from 'react-router-dom';

import Home from './Home/Home.jsx';

// Import de rutas de usuarios
import Validate from './Users/Validate/Validate.jsx';
import Register from './Users/Register/Register.jsx';
import Login from './Users/Login/Login.jsx';

// Import de rutas de gestión de contraseñas
import RecoveryPass from './Users/Password/Recovery/RecoveryPass.jsx';

// Import de rutas de meetups
import CreateMeetup from './Meetups/Create/CreateMeetup.jsx';
import ChangePass from './Users/Password/changePass/ChangePass.jsx';
import EditMeetup from './Meetups/Edit/EditMeetup.jsx';
import { EditUser } from './Users/Edit/EditUser.jsx';
import Profile from './Users/Profile/Profile.jsx';
import AdminPage from './Users/Admin/AdminPage.jsx';

const AppRoutes = () => (
    <>
        <Routes>
            {/* Home según sea usuario anónimo o registrado */}
            <Route path="/" element={<Home />} />

            <Route path="admin" element={<AdminPage />} />

            {/* Rutas de usuario */}
            <Route path="user">
                {/* Página de registro de usuario */}
                <Route path="register" element={<Register />} />
                {/* Página donde el usuario es informado de que está validado */}
                <Route path="validate" element={<Validate />} />
                {/* Página para iniciar sesión */}
                <Route path="login" element={<Login />} />
                <Route path="profile" element={<Profile />} />
                <Route path="password">
                    {/* Página para solicitar la recuperación de la contraseña */}
                    <Route path="recover" element={<RecoveryPass />} />
                    {/* Página para el cambio de contraseña */}
                    <Route path="changepass" element={<ChangePass />} />
                </Route>
                <Route path="edit" element={<EditUser />} />
            </Route>

            {/* Rutas de meetups */}
            <Route path="meetup">
                {/* Página para crear un meetup */}
                <Route path="create" element={<CreateMeetup />} />
                {/* Página para editar un meetup */}
                <Route path="edit" element={<EditMeetup />} />
            </Route>

            {/* Ruta para redirigir cualquier ruta no válida */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </>
);

export default AppRoutes;
