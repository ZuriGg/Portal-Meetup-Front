import { useState, useEffect } from 'react';
import { useUser } from '../../../UserContext.jsx';
import './EditUser.css';

export const EditUser = () => {
    const [user] = useUser();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [inputDate, setInputDate] = useState({
        firstName: '',
        lastname: '',
        username: '',
        email: '',
    });

    // Manejar el cambio de los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputDate((prevInputDate) => ({
            ...prevInputDate,
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
                                Authorization: `${user.token.token}`,
                            }),
                        },
                    }
                );

                if (!responseUser.ok) {
                    throw new Error('Error al obtener los datos del usuario');
                }
                const dataUser = await responseUser.json();
                console.log(dataUser);

                setInputDate({
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
        if (inputDate.firstName.length < 2) {
            setError('El nombre debe tener al menos 2 caracteres.');
            return;
        }
        if (inputDate.lastname.length < 2) {
            setError('El apellido debe tener al menos 2 caracteres.');
            return;
        }
        if (!inputDate.email.includes('@')) {
            setError('El correo electrónico no es válido.');
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
                            Authorization: `${user.token.token}`,
                        }),
                    },
                    body: JSON.stringify(inputDate),
                }
            );

            const responseData = await response.json();
            console.log(responseData); // Ver respuesta completa del servidor

            if (!response.ok) {
                setError('No se ha logrado la modificación');
                return;
            }

            setSuccess(true); // Operación exitosa
        } catch (error) {
            setError(`${error}`);
        }
    };

    return (
        <div className="areaFormulario">
            <h1>Edita tu usuario</h1>

            <form onSubmit={handleSubmit}>
                <label>
                    Nombre:
                    <input
                        type="text"
                        name="firstName"
                        placeholder="Nombre"
                        value={inputDate.firstName}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Apellido:
                    <input
                        type="text"
                        name="lastname"
                        placeholder="Apellido"
                        value={inputDate.lastname}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Nombre de usuario:
                    <input
                        type="text"
                        name="username"
                        placeholder="Nickname"
                        value={inputDate.username}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Correo electrónico:
                    <input
                        type="email"
                        name="email"
                        placeholder="Correo electrónico"
                        value={inputDate.email}
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
