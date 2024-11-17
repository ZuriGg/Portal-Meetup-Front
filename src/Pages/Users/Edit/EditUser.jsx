import { useState, useEffect } from 'react';
import { useUser } from '../../../UserContext.jsx';

export const EditUser = () => {
    const [user] = useUser();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastname: '',
        username: '',
        email: '',
    });

    // Manejar el cambio de los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    // Cargar los datos del usuario al montar el componente
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const responseUser = await fetch(
                    `http://localhost:3000/users/${user.id}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            ...(user?.token && {
                                Authorization: `Bearer ${user.token}`,
                            }),
                        },
                    }
                );

                if (!responseUser.ok) {
                    throw new Error('Error al obtener los datos del usuario');
                }
                const dataUser = await responseUser.json();
                console.log(dataUser);

                setFormData({
                    firstName: dataUser.firstName || '',
                    lastname: dataUser.lastname || '',
                    username: dataUser.username || '',
                    email: dataUser.email || '',
                });
            } catch (error) {
                setError(`Error: ${error.message}`);
            }
        };

        if (user?.token) {
            fetchUserData();
        } else {
            setError('Token no disponible');
        }
    }, [user?.token, user?.id]); //

    // Enviar los datos del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Limpiar error antiguo
        setSuccess(false); // Limpiar éxito antiguo

        // Validaciones simples de los campos
        if (formData.firstName.length < 2) {
            setError('El nombre debe tener al menos 2 caracteres.');
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:3000/users/edit/${user.id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        ...(user?.token && {
                            Authorization: `Bearer ${user.token}`,
                        }),
                    },
                    body: JSON.stringify(formData),
                }
            );

            if (!response.ok) {
                // Intenta obtener la respuesta como JSON solo si es posible
                const errorData = await response.text(); // Cambié a text() para no asumir que siempre es JSON
                let errorMessage = 'Error al editar el usuario';
                try {
                    const parsedError = JSON.parse(errorData);
                    errorMessage = parsedError.message || errorMessage;
                } catch {
                    // Si no se puede parsear como JSON, mantenemos el mensaje original
                }
                throw new Error(errorMessage);
            }

            await response.json(); // Si la respuesta es ok, procesamos los datos
            setSuccess(true); // Operación exitosa
        } catch (error) {
            setError(`${error}`);
        }
    };

    return (
        <div id="formularioNuevoUsuario">
            <h1>Edita tu usuario</h1>

            <form onSubmit={handleSubmit}>
                <label>
                    Nombre:
                    <input
                        type="text"
                        name="firstName"
                        placeholder="Nombre"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Apellido:
                    <input
                        type="text"
                        name="lastname"
                        placeholder="Apellido"
                        value={formData.lastname}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Nombre de usuario:
                    <input
                        type="text"
                        name="username"
                        placeholder="Nickname"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Correo electrónico:
                    <input
                        type="email"
                        name="email"
                        placeholder="Correo electrónico"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Editar</button>
                {success && <p>Usuario editado correctamente</p>}
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};
