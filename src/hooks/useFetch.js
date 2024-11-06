import { useEffect, useState } from 'react';
import { useUser } from '../UserContext.jsx';

function useFetch(url, options = {}) {
    const [user] = useUser();
    const [content, setContent] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            // Definir los headers de autorización si el usuario tiene un token
            const headers = user?.token
                ? { Authorization: `Bearer ${user.token}`, ...options.headers }
                : options.headers || {};

            try {
                const response = await fetch(url, {
                    ...options,
                    headers: {
                        'Content-Type': 'application/json',
                        ...headers,
                    },
                });

                // Verificar si la respuesta fue exitosa
                if (!response.ok) {
                    throw new Error('Error en la solicitud');
                }

                // Procesar el contenido de la respuesta
                const data = await response.json();
                setContent(data);
            } catch (error) {
                console.error('Error al realizar el fetch:', error);
                setContent(null); // O manejar el error de otra forma si es necesario
            }
        };

        fetchData();
    }, [url, user?.token, options]);

    return content;
}

export default useFetch;
