import { useEffect, useState } from 'react';
import { useUser } from '../../../UserContext.jsx';
import './EditUser.css';
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    useEffect(() => {
        if (!user.token || !user.token.token) {
            setError('No se encontró un token de autenticación.');
            return;
        } //comprobar autenticación del usuario

        const fetchUserData = async () => {
            try {
                //sustituir el id por ${user.id}
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

                if (!response.ok)
                    throw new Error('Error al obtener datos del usuario');

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); //limpiamos error antiguo
        setSuccess(false); //limpiamos éxito antiguo

        try {
            if (formData.firstName.length < 2) {
                throw new Error('El nombre debe tener al menos 2 caracteres');
            }

            if (!/\S+@\S+\.\S+/.test(formData.email)) {
                throw new Error('El correo electrónico no es válido');
            }

            if (formData.username.length < 3) {
                throw new Error(
                    'El nombre de usuario debe tener al menos 3 caracteres'
                );
            }

            //sustituir el id por ${user.id}
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

            // await response.json();
            setSuccess(true); //operación exitosa
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <>
            <div id="formularioNuevoUsuario">
                <h1>Edita tu usuario</h1>

                <form onSubmit={handleSubmit}>
                    <label>
                        Nombre:
                        <input
                            type="text"
                            name="firstName"
                            placeholder="Nombre del usuario"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Apellido:
                        <input
                            type="text"
                            name="lastname"
                            placeholder="Apellido del usuario"
                            value={formData.lastname}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            placeholder="Email del usuario"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Username:
                        <input
                            type="text"
                            name="username"
                            placeholder="Nickname"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </label>
                    <button type="submit">Editar</button>
                    {success && <p>Usuario editado correctamente</p>}
                    {error && <p>{error}</p>}
                </form>
            </div>
        </>
    );
};
