import { useEffect, useState } from 'react';
import { useUser } from '../../../UserContext.jsx';
import './EditMeetup.css';
import { useNavigate, useParams } from 'react-router-dom';

function EditMeetup() {
    const [user] = useUser();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const URL_BACK = import.meta.env.VITE_URL_BACK;

    const [files, setFiles] = useState({
        image1: null,
        image2: null,
        image3: null,
    });

    const [previews, setPreviews] = useState({
        image1: null,
        image2: null,
        image3: null,
    });

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        startDate: '',
        oneSession: false,
        categoryId: '',
        city: '',
        address: '',
        zip: '',
        hourMeetup: '',
        dayOfTheWeek: '',
        aforoMax: '',
        locationId: '',
    });

    const { meetupId } = useParams();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]:
                type === 'checkbox'
                    ? checked
                    : name === 'dayOfTheWeek'
                    ? value.toLowerCase()
                    : name === 'hourMeetup'
                    ? value.slice(0, 5)
                    : value,
        });
    };

    // Manejo de cambios de archivos de imagen
    const handleFileChange = (e, inputName) => {
        const file = e.target.files[0];
        setFiles((prev) => ({
            ...prev,
            [inputName]: file,
        }));
        setPreviews((prev) => ({
            ...prev,
            [inputName]: file ? URL.createObjectURL(file) : null,
        }));
    };

    useEffect(() => {
        const fetchMeetupData = async () => {
            try {
                const responseMeetup = await fetch(
                    `${URL_BACK}/meetups/${meetupId}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: user.token.token,
                        },
                    }
                );
                const dataMeetup = await responseMeetup.json();

                if (!responseMeetup.ok)
                    throw new Error('Error al obtener datos del meetup');

                // Obtener los datos de la ubicación
                const responseLocation = await fetch(
                    `${URL_BACK}/location/${dataMeetup.data.locationId}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: user.token.token,
                        },
                    }
                );

                if (!responseLocation.ok)
                    throw new Error('Error al obtener datos de la location');

                const dataLocation = await responseLocation.json();

                // Obtener las imágenes asociadas al meetup
                const responsePhotos = await fetch(
                    `${URL_BACK}/meetups/${meetupId}/photos`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: user.token.token,
                        },
                    }
                );
                const dataPhotos = await responsePhotos.json();

                if (!responsePhotos.ok)
                    throw new Error('Error al obtener fotos del meetup');

                // Asegurarnos de que dataPhotos.data es un array de imágenes
                const images = dataPhotos.data || [];
                const imagePreviews = {};

                // Asegúrate de acceder a las URLs dentro de `data` y asignarlas correctamente
                images.forEach((image, index) => {
                    if (image && image.name) {
                        // Asignamos la URL de cada imagen a las claves correspondientes
                        const key = `image${index + 1}`; // Cambié para coincidir con "image1", "image2", etc.
                        imagePreviews[
                            key
                        ] = `${URL_BACK}/uploads/${image.name}`;
                    }
                });

                // Actualizamos el estado `previews` con las imágenes obtenidas del servidor
                setPreviews((prev) => ({
                    ...prev,
                    ...imagePreviews, // Actualizamos las previsualizaciones de las imágenes
                }));

                // Actualizamos el formulario
                setFormData({
                    title: dataMeetup.data.title || '',
                    description: dataMeetup.data.description || '',
                    startDate: dataMeetup.data.startDate || '',
                    oneSession: !!dataMeetup.data.oneSession,
                    categoryId: dataMeetup.data.categoryId || '',
                    hourMeetup: dataMeetup.data.hourMeetup || '',
                    dayOfTheWeek: dataMeetup.data.dayOfTheWeek || '',
                    aforoMax: dataMeetup.data.aforoMax || '',
                    locationId: dataMeetup.data.locationId || '',
                    city: dataLocation.data.city || '',
                    address: dataLocation.data.address || '',
                    zip: dataLocation.data.zip || '',
                });
            } catch (error) {
                setError(`Error: ${error.message}`);
            }
        };

        fetchMeetupData();
    }, [user?.token]);

    const enviarDatos = async (e) => {
        e.preventDefault();

        try {
            // Validaciones de los campos
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
            if (formData.zip.length !== 5) {
                throw new Error('El código postal debe tener 5 dígitos');
            }

            const formattedFormData = {
                ...formData,
                hourMeetup: formData.hourMeetup.slice(0, 5),
                startDate: formData.startDate.split('T')[0], // Extraer solo la parte de la fecha (YYYY-MM-DD)
            };

            // Enviar datos principales
            const response = await fetch(
                `${URL_BACK}/meetups/edit/${meetupId}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        ...(user?.token && { Authorization: user.token.token }),
                    },
                    body: JSON.stringify(formattedFormData),
                }
            );

            if (!response.ok) {
                throw new Error('Error en la solicitud principal');
            }

            // Subir imágenes (usando Promise.all)
            const uploadPromises = Object.entries(files).map(
                async ([key, file]) => {
                    if (file) {
                        const formDataImage = new FormData();
                        formDataImage.append(key, file);

                        const uploadResponse = await fetch(
                            `${URL_BACK}/meetups/${meetupId}/photo/${key}`,
                            {
                                method: 'PUT',
                                headers: {
                                    ...(user?.token && {
                                        Authorization: user.token.token,
                                    }),
                                },
                                body: formDataImage,
                            }
                        );

                        if (!uploadResponse.ok) {
                            throw new Error(`Error al subir la imagen ${key}`);
                        }
                    }
                }
            );

            await Promise.all(uploadPromises);

            // Si todo fue exitoso, redirigir
            setSuccess(true);
            setError(null);
            navigate('/user/profile');
        } catch (error) {
            setSuccess(false);
            setError(`${error}`);
        }
    };

    return (
        <div className="areaFormulario editMeetup">
            <h1>Edición de un meetup</h1>

            <form onSubmit={enviarDatos}>
                {['image1', 'image2', 'image3'].map((inputName) => (
                    <div className="PrevisualizacionImagen" key={inputName}>
                        <label className="previsualizacion">
                            {previews[inputName] ? (
                                <img
                                    src={previews[inputName]}
                                    alt={`Preview ${inputName}`}
                                />
                            ) : (
                                <div className="añadirImagen" />
                            )}
                            <input
                                type="file"
                                name={inputName}
                                onChange={(e) => handleFileChange(e, inputName)}
                            />
                        </label>
                    </div>
                ))}
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
                        placeholder="¿Cuándo comienza el evento?"
                        value={
                            formData.startDate
                                ? new Date(formData.startDate)
                                      .toISOString()
                                      .split('T')[0]
                                : ''
                        }
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
                        name="hourMeetup"
                        value={formData.hourMeetup}
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
                        <option value="">Selecciona un día de la semana</option>

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
                {success && <p>Meetup editado correctamente</p>}
                {error && <p>{error}</p>}
            </form>
        </div>
    );
}

export default EditMeetup;
