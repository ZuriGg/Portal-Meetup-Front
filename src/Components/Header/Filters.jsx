import { useState } from 'react';
import { useMeetup } from '../../MeetupContext.jsx';

import './Filters.css';

const Filters = () => {
    const { setFilters, setQry } = useMeetup();
    const [localFilters, setLocalFilters] = useState({
        search: '',
        location: '',
    });

    console.log(`filtro to wapo to potente ${localFilters.location}`);

    // Maneja los cambios en los inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLocalFilters((prev) => ({
            ...prev,
            [name]: value, // Actualiza el estado de los filtros locales
        }));
    };

    // Maneja el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        // Actualiza los filtros globales y la query string
        setFilters(localFilters);
        setQry(new URLSearchParams(localFilters).toString());
        console.log('Filtros enviados:', localFilters);
    };

    return (
        <form className="search-form" onSubmit={handleSubmit}>
            <div className="filters">
                <input
                    type="text"
                    name="search"
                    placeholder="Buscar meetups!"
                    value={localFilters.search}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="location"
                    placeholder="Introduce una ubicación"
                    value={localFilters.location}
                    onChange={handleInputChange}
                />
                <button type="submit">Buscar</button>
            </div>
        </form>
    );
};

export default Filters;
