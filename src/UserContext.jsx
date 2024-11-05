import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

export const UserContext = createContext();
export const useUser = () => useContext(UserContext);
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("session")) || null
  );

  const enhancedSetUser = (better) => {
    setUser(better);
    localStorage.setItem("session", JSON.stringify(better));
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
