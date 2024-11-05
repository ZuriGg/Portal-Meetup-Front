import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Home from "./Home/Home.jsx";

// Import de rutas de usuarios
import ValidateUser from "./Users/Validate/ValidateUser.jsx";
import Register from "./Users/Register/Register.jsx";
import Login from "./Users/Login/Login.jsx";

// Import de rutas de gestión de contraseñas
import RecoveryPass from "./Users/Password/Recovery/RecoveryPass.jsx";

// Import de rutas de meetups
import CreateMeetup from "./Meetups/Create/CreateMeetup.jsx";
import EditMeetup from "./Meetups/Edit/EditMeetup.jsx";

const AppRoutes = () => (
    <>
        <Routes>
            {/* Aqui iria el Home según sea usuario anónimo o registrado */}
            <Route path="/" element={<Home />} />

            {/* Rutas de usuario */}
            <Route path="user">
                {/* Aqui iria la página de registro de usuario */}
                <Route path="register" element={<Register />} />
                {/* Aquí iria la página donde el usuario es informado de que está validado */}
                <Route path="Validate" element={<ValidateUser />} />
                {/* Aquí iria la página para iniciar sesión */}
                <Route path="Login" element={<Login />} />
                <Route path="password">
                    {/* Aquí iria la página para solicitar la recuperación de la contraseña */}
                    <Route path="recover" element={<RecoveryPass />} />
                </Route>
            </Route>

            {/* Rutas de meetups */}
            <Route path="meetup">
                {/* Aquí iria la página para crear un meetup */}
                <Route path="create" element={<CreateMeetup />} />
                {/* Aquí iria la página para editar un meetup */}
                <Route path="edit" element={<EditMeetup />} />
            </Route>

            {/* Ruta para redirigir cualquier ruta no válida */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </>
);

export default AppRoutes;
