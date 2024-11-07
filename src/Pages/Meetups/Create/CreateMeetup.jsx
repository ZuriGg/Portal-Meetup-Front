// Página para la creación de un Meetup
import './CreateMeetup.css';
import useFetch from '../../../hooks/useFetch.js';
import { useState } from 'react';

function CreateMeetup() {
    // Estado para almacenar los datos ingresados por el usuario
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        startDate: '',
        oneSession: '',
        categoryId: '',
        locationId: '',
        city: '',
        address: '',
        notes: '',
        zip: '',
        userId: '',
        hourMeetUp: '',
        dayOfTheWeek: '',
        aforoMax: '',
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    /* HACER ARCHIVO API CON LOS FETCH */
    const enviarDatos = (e) => {
        e.preventDefault();
        const response = useFetch('http://localhost:3000/meetupentries', {
            method: 'POST',
            body: JSON.stringify(formData),
        });
    };

    return (
        <>
            <div id="formularioNuevoMeetup">
                <h1>Creación de un nuevo meetup</h1>

                <form onSubmit={enviarDatos}>
                    <label>
                        Title:
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label>
                        Description:
                        <textarea
                            name="description"
                            id="areaDescripcion"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label>
                        Start Date:
                        <input
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label>
                        One Session:
                        <input
                            type="checkbox"
                            name="oneSession"
                            checked={formData.oneSession}
                            onChange={handleChange}
                        />
                    </label>

                    <label>
                        Category ID:
                        <input
                            type="text"
                            name="categoryId"
                            value={formData.categoryId}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label>
                        City:
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label>
                        Address:
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label>
                        Notes:
                        <input
                            type="text"
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                        />
                    </label>

                    <label>
                        ZIP:
                        <input
                            type="text"
                            name="zip"
                            value={formData.zip}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label>
                        User ID:
                        <input
                            type="text"
                            name="userId"
                            value={formData.userId}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label>
                        Hour of Meetup:
                        <input
                            type="time"
                            name="hourMeetUp"
                            value={formData.hourMeetUp}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label>
                        Day of the Week:
                        <input
                            type="text"
                            name="dayOfTheWeek"
                            value={formData.dayOfTheWeek}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label>
                        Aforo Max:
                        <input
                            type="number"
                            name="aforoMax"
                            value={formData.aforoMax}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <button type="submit">Enviar</button>
                </form>
            </div>
        </>
    );
}

export default CreateMeetup;
