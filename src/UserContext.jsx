import PropTypes from 'prop-types';
import { createContext, useContext, useState } from 'react';

export const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
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

    return (
        <UserContext.Provider value={[user, enhancedSetUser]}>
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
