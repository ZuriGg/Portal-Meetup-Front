import { useEffect, useState } from "react";
import { useUser } from "../UserContext.jsx";

function useFetch(url) {
  const [user] = useUser();
  const [content, setContent] = useState(null);

  const headers = {};
  if (user?.token)
    headers.Authorization =
      "Bearer " +
      user?.token; /* en la petición, mandamos el token mediante header */

  useEffect(() => {
    fetch(url, { headers })
      .then((res) => res.json())
      .then((data) => setContent(data));
  }, [url, user?.token]); //se va a efectuar el fetch cada vez que cambie la url o cada vez q lo haga el usuario logado
  return content;
}

export default useFetch;
