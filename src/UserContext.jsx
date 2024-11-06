import PropTypes from "prop-types";
import { createContext, useContext, useState } from "react";

export const UserContext = createContext();
export const useUser = () => useContext(UserContext);
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("session")) || {
      email: "",
      username: "",
      firstName: "",
      lastName: "",
      meetupOwner: "",
      avatar: "",
      active: false,
      role: "normal", // rol por defecto
    }
  );

  // Función para actualizar el usuario en el estado y localStorage
  const enhancedSetUser = (betterUser) => {
    setUser(betterUser);
    localStorage.setItem("session", JSON.stringify(betterUser));
  };

  return (
    <UserContext.Provider value={[user, enhancedSetUser]}>
      {children}
    </UserContext.Provider>
  );
};

// para llamar usar el contexto, solo hay que llamarlo en cada componente: const [user, setUser] = useUser();

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
