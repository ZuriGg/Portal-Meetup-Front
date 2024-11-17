// Página para la creación de un Meetup
import './CreateMeetup.css';
import { useState } from 'react';
import { useUser } from '../../../UserContext.jsx';

function CreateMeetup() {
    const [user] = useUser();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    //cogemos los datos de la sesión almacenada en el localStorage
    const sessionData = JSON.parse(localStorage.getItem('session'));

    const id = sessionData.id;

    //datos del formulario
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        startDate: '',
        oneSession: undefined, //booleano --> evento de una sola sesión
        categoryId: '',
        city: '',
        address: '',
        zip: '',
        userId: id,
        hourMeetup: '',
        dayOfTheWeek: '',
        aforoMax: '',
    });

    //handleChange para actualizar los valores del formulario
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]:
                type === 'checkbox'
                    ? checked
                    : name === 'dayOfTheWeek'
                    ? value.toLowerCase()
                    : value,
        });
    };

    //enviarDatos --> envia datos a un servidor mediante una solicitud POST
    const enviarDatos = async (e) => {
        e.preventDefault();

        try {
            //validamos los datos
            if (formData.title.length < 5) {
                throw new Error(
                    'El Nombre del evento debe tener al menos 5 caracteres'
                );
            }
            if (formData.description.length < 10) {
                throw new Error(
                    'La descripción del evento debe tener al menos 10 caracteres'
                );
            }
            if (formData.zip.length != 5) {
                throw new Error('El codigo postal debe tener 5 dígitos');
            }

            //si supera las comprobaciones previas --> solicitud POST al servidor
            const response = await fetch('http://localhost:3000/meetups', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(user?.token && {
                        Authorization: `Bearer ${user.token}`, //se le manda el token del usuario
                    }),
                },
                body: JSON.stringify(formData), //convertimos los datos del formulario a JSON
            });

            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }

            console.log('User token:', user?.token);

            await response.json();
            setSuccess(true); //operación exitosa
            setError(false); //limpiamos mensajes de error
        } catch (error) {
            setSuccess(false); //operación fallida
            setError(`${error}`); //muestra el error
        }
    };

    return (
        <>
            <div id="formularioNuevoMeetup">
                <h1>Creación de un nuevo meetup</h1>

                <form onSubmit={enviarDatos}>
                    <label>
                        Título:
                        <input
                            type="text"
                            name="title"
                            placeholder="Nombre del evento"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label>
                        Descripción:
                        <textarea
                            name="description"
                            placeholder="Explica de que trata tu evento"
                            id="areaDescripcion"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label>
                        Fecha de inicio:
                        <input
                            type="date"
                            name="startDate"
                            placeholder="¿Cuando comienza el evento?"
                            value={formData.startDate}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label>
                        ¿Evento único?
                        <input
                            type="checkbox"
                            name="oneSession"
                            checked={formData.oneSession}
                            onChange={handleChange}
                        />
                    </label>

                    <label>
                        Categoría:
                        <select
                            name="categoryId"
                            value={formData.categoryId}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecciona una categoría:</option>

                            <option value="1">Viajes y aire libre</option>
                            <option value="2">Actividades sociales</option>
                            <option value="3">Aficiones y pasiones</option>
                            <option value="4">Deportes y fitness</option>
                            <option value="5">Salud y bienestar</option>
                            <option value="6">Tecnología</option>
                            <option value="7">Arte y cultura</option>
                            <option value="8">Juegos</option>
                        </select>
                    </label>

                    <label>
                        Ciudad:
                        <input
                            type="text"
                            name="city"
                            placeholder="Ciudad en la que se desarrollará el evento"
                            value={formData.city}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label>
                        Dirección:
                        <input
                            type="text"
                            name="address"
                            placeholder="Calle donde se desarrollará el evento"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label>
                        Código postal:
                        <input
                            type="number"
                            name="zip"
                            placeholder="Código postal de 5 dígitos"
                            value={formData.zip}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label>
                        Hora del meetup:
                        <input
                            type="time"
                            name="hourMeetup"
                            value={formData.hourMeetup}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label>
                        Día de la semana:
                        <select
                            name="dayOfTheWeek"
                            value={formData.dayOfTheWeek}
                            onChange={handleChange}
                            required
                        >
                            <option value="">
                                Selecciona un día de la semana
                            </option>

                            <option value="lunes">Lunes</option>
                            <option value="martes">Martes</option>
                            <option value="miercoles">Miercoles</option>
                            <option value="jueves">Jueves</option>
                            <option value="viernes">Viernes</option>
                            <option value="sabado">Sabado</option>
                            <option value="domingo">Domingo</option>
                        </select>
                    </label>

                    <label>
                        Aforo máximo:
                        <input
                            type="number"
                            name="aforoMax"
                            placeholder="Cantidad de gente que puede asistir"
                            value={formData.aforoMax}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <button type="submit">Enviar</button>

                    {success && <p>Meetup creado con éxito</p>}
                    {error && <p>{error}</p>}
                </form>
            </div>
        </>
    );
}

export default CreateMeetup;
