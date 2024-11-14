import { useEffect, useState } from 'react';
import { useUser } from '../../../UserContext.jsx';
import './EditUser.css';
export const EditUser = () => {
    const [user] = useUser();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    /*     const sessionData = JSON.parse(localStorage.getItem('session')); */

    const [formData, setFormData] = useState({
        firstName: '',
        lastname: '',
        email: '',
        username: '',
        password: '',
        aforoMax: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(
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

                if (!response.ok)
                    throw new Error('Error al obtener datos del usuario');

                const data = await response.json();

                setFormData({
                    firstName: data.firstName || '',
                    lastname: data.lastname || '',
                    email: data.email || '',
                    username: !!data.username,
                    password: data.password || '',
                    aforoMax: data.aforoMax || '',
                });
            } catch (error) {
                setError(`Error: ${error.message}`);
            }
        };

        fetchUserData();
    }, [user?.token]);

    const enviarDatos = async (e) => {
        e.preventDefault();

        try {
            if (formData.firstName.length < 2) {
                throw new Error('El nombre debe tener al menos 2 caracteres');
            }

            if (!/\S+@\S+\.\S+/.test(formData.email)) {
                throw new Error('El correo electrónico no es válido');
            }

            const response = await fetch(
                'http://localhost:3000/users/edit/${user.id}',
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
                throw new Error('Error en la solicitud');
            }

            await response.json();
            setSuccess(true);
            setError(false);
        } catch (error) {
            setSuccess(false);
            setError(`${error}`);
        }
    };

    return (
        <>
            <div id="formularioNuevoUsuario">
                <h1>Edita tu usuario</h1>

                <form onSubmit={enviarDatos}>
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
                            name="apellido"
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
                            placeholder="Nombre de usuario"
                            checked={formData.username}
                            onChange={handleChange}
                        />
                    </label>

                    <label>
                        Password:
                        <input
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
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
