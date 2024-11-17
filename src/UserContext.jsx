import PropTypes from 'prop-types';
import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const navigate = useNavigate();
    const storedUser = localStorage.getItem('session');
    const initialUser = storedUser
        ? JSON.parse(storedUser)
        : {
              email: '',
              username: '',
              firstName: '',
              lastName: '',
              meetupOwner: '',
              avatar: '',
              role: '',
              token: '',
          };

    // Función para actualizar el usuario en el estado y localStorage
    const [user, setUser] = useState(initialUser);

    const enhancedSetUser = (betterUser) => {
        console.log('Actualizando usuario:', betterUser);
        setUser(betterUser);
        localStorage.setItem('session', JSON.stringify(betterUser));
    };

    const handleLogout = () => {
        setUser({
            email: '',
            username: '',
            firstName: '',
            lastName: '',
            meetupOwner: '',
            avatar: '',
            role: '',
            token: '', // Limpiamos el token
        });
        localStorage.removeItem('session'); // Eliminamos el usuario del localStorage
        navigate('/'); // Redirigimos al Home o Login
    };

    return (
        <UserContext.Provider value={[user, enhancedSetUser, handleLogout]}>
            {children}
        </UserContext.Provider>
    );
};

// para llamar usar el contexto, solo hay que llamarlo en cada componente: const [user, setUser] = useUser(); y si quieres usar los datos concretos del usuario:  <h1>Bienvenido, {user.firstName} {user.lastName}</h1>
// <p>Rol: {user.role}</p>
// <p>Email: {user.email}</p>

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
