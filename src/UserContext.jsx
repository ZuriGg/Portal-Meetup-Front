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
              lastname: '',
              avatar: '',
              role: '',
              token: '',
              id: '',
              location: { city: '', region: '', country: '' }, // Añadimos ubicación
          };

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
            lastname: '',
            avatar: '',
            id: '',
            role: '',
            active: '',
            token: '',
            location: { city: '', region: '', country: '' }, // Reseteamos ubicación
        });
        localStorage.removeItem('session');
        navigate('/');
    };

    return (
        <UserContext.Provider value={[user, enhancedSetUser, handleLogout]}>
            {children}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
