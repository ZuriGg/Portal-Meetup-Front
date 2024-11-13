// Página para la creación de un Meetup
import './CreateMeetup.css';
import { useState } from 'react';
import { useUser } from '../../../UserContext.jsx';

function CreateMeetup() {
    const [user] = useUser();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const sessionData = JSON.parse(localStorage.getItem('session'));

    const id = sessionData.dataUser.id;

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        startDate: '',
        oneSession: undefined,
        categoryId: '',
        city: '',
        address: '',
        zip: '',
        userId: id,
        hourMeetUp: '',
        dayOfTheWeek: '',
        aforoMax: '',
    });

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

    const enviarDatos = async (e) => {
        e.preventDefault();

        try {
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

            const response = await fetch('http://localhost:3000/meetups', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(user?.token && {
                        Authorization: `Bearer ${user.token}`,
                    }),
                },
                body: JSON.stringify(formData),
            });

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
                        Solo una vez?
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
                            <option value="">Selecciona una categoría</option>

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
                            placeholder="Ciudad donde se realizará el evento"
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
                            placeholder="Calle donde se realizará el evento"
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
                            name="hourMeetUp"
                            value={formData.hourMeetUp}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label>
                        Dia de la semana:
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

                    {success && <p>Meetup creado correctamente</p>}
                    {error && <p>{error}</p>}
                </form>
            </div>
        </>
    );
}

export default CreateMeetup;
