import React from "react";
import { Navigate, Route, Route } from "react-router-dom";

import Home from "./Home/Home.jsx";
import ValidateUser from "./Validate/ValidateUser.jsx";
import Register from "./Register/Register.jsx";
import CreateMeetup from "./Create/CreateMeetup.jsx";
import RecoveryPass from "./Recovery/RecoveryPass.jsx";
import Login from "./Login/Login.jsx";
import EditMeetup from "./Edit/EditMeetup.jsx";

const Routes = () => (
    <>
        <Route index element={<Home />} />
        {/* Aqui iria el Home según sea usuario anonimo o registrado */}
        <Route path="user">
            <Route path="register" element={<Register />} />
            {/* Aqui iria la página de registro de usuario */}
            <Route path="Validate" element={<ValidateUser />} />
            {/* Aquí iria la página donde el usuario es informado de que está validado */}
            <Route path="Login" element={<Login />} />
            {/* Aquí iria la página para iniciar sesión */}
            <Route path="password">
                <Route path="recover" element={<RecoveryPass />} />
                {/* Aquí iria la página para solicitar la recuperación de la contraseña */}
            </Route>
        </Route>
        <Route path="meetup">
            <Route path="create" element={<CreateMeetup />} />
            {/* Aquí iria la página para crear un meetup */}
            <Route path="edit" element={<EditMeetup />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
    </>
);

export default Routes;
