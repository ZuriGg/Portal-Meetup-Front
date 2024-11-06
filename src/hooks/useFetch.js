import { useEffect, useState } from "react";
import { useUser } from "../UserContext.jsx";

function useFetch(url) {
  const [user] = useUser();
  const [content, setContent] = useState(null);

  useEffect(() => {
    //define los headers solo si hay un token
    const headers = user?.token
      ? { Authorization: `Bearer ${user.token}` }
      : {};

    fetch(url, { headers })
      .then((res) => res.json())
      .then((data) => setContent(data))
      .catch(() => setContent(null)); // Puedes definir qué hacer en caso de error
  }, [url, user?.token]);
  //se va a efectuar el fetch cada vez que cambie la url o cada vez q lo haga el usuario logado
  return content;
}

export default useFetch;
