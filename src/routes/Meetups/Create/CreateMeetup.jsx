// Página para la creación de un Meetup
import "./CreateMeetup.css";

import React, { useState } from "react";

function CreateMeetup() {
    // Estado para almacenar los datos ingresados por el usuario
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        startDate: "",
        oneSession: "",
        categoryId: "",
        locationId: "",
        city: "",
        address: "",
        notes: "",
        zip: "",
        userId: "",
        owner: "",
        hourMeetUp: "",
        dayOfTheWeek: "",
        aforoMax: "",
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const enviarDatos = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                "http://localhost:3000/meetupentries",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            if (!response.ok) {
                throw new Error(
                    "La solicitud no se ha podido efectuar, ha fallado la conexión"
                );
            }
        } catch (error) {
            console.error("Error al enviar los datos:", error);
        }
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
                        Location ID:
                        <input
                            type="text"
                            name="locationId"
                            value={formData.locationId}
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
                        Owner:
                        <input
                            type="text"
                            name="owner"
                            value={formData.owner}
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
