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

    // Cargar los datos del usuario al montar el componente
    useEffect(() => {
        if (!user.token || !user.token.token) {
            setError('No se encontró un token de autenticación.');
            return;
        }

        const fetchUserData = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3000/users/${user.dataUser.id}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            ...(user?.token.token && {
                                Authorization: `Bearer ${user.token.token}`,
                            }),
                        },
                    }
                );
                const data = await response.json();
                setFormData({
                    firstName: data.firstName || '',
                    lastname: data.lastname || '',
                    username: data.username || '',
                    email: data.email || '',
                });
            } catch (error) {
                setError(`Error: ${error.message}`);
            }
        };

        fetchUserData();
    }, [user?.token.token, user?.dataUser.id]);

    // Manejar el cambio de los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

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
                `http://localhost:3000/users/edit/${user.dataUser.id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${user.token.token}`,
                    },
                    body: JSON.stringify(formData),
                }
            );

            if (!response.ok) {
                throw new Error('Error en la solicitud de edición del usuario');
            }

            setSuccess(true); // Operación exitosa
        } catch (error) {
            setError(error.message);
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
