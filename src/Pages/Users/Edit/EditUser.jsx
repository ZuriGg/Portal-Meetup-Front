import { useState, useEffect } from 'react';
import { useUser } from '../../../UserContext.jsx';
import './EditUser.css';
//import Avatar from '../../../Components/Avatar/Avatar.jsx';

export const EditUser = () => {
    const [user, enhancedSetUser] = useUser();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [inputDate, setInputDate] = useState({
        firstName: '',
        lastname: '',
        email: '',
        username: '',
    });

    // capturar el cambio de los campos del formulario
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
                if (!user?.id || !user?.token) {
                    throw new Error(
                        'No se encontraron datos del usuario o token no válido.'
                    );
                }

                const response = await fetch(
                    `http://localhost:3000/users/${user.id}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `${user.token.token}`,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error('Error al obtener los datos del usuario');
                }

                await response.json();

                setInputDate({
                    firstName: user.firstName || '',
                    lastname: user.lastname || '',
                    username: user.username || '',
                    email: user.email || '',
                });
            } catch (err) {
                setError(err.message);
            }
        };

        fetchUserData();
    }, [user?.id, user?.token]);

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

            //1ro comprobamos si la respuesta es correcta
            if (!response.ok) {
                setError('No se ha logrado la modificación');
                return;
            }

            //2do actualizamos el contexto con los nuevos datos
            //const updatedUser = (await response.json()).data.user;
            const { data } = await response.json();

            // Actualizar el estado local (inputDate) con los nuevos datos
            setInputDate({
                firstName: data.firstName,
                lastname: data.lastname,
                username: data.username,
                email: data.email,
            });

            // Actualizar el contexto y localStorage explícitamente
            enhancedSetUser({
                ...user, // Mantener los datos previos del usuario
                ...data, // Sobrescribir con los nuevos datos
            });

            setSuccess(true); // Operación exitosa
        } catch (error) {
            setError(`${error}`);
        }
    };

    return (
        <div className="areaFormulario">
            <h1>Edite su usuario</h1>

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
                <button type="submit">Guardar cambios</button>
                {success && <p>Usuario editado correctamente</p>}
                {error && <p>{error}</p>}
                {/* <Avatar /> NO SE PUEDE METER UN FORMULARIO DENTRO DE OTRO */}
            </form>
        </div>
    );
};
