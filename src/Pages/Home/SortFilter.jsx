import { useState } from 'react';
import { useMeetup } from '../../MeetupContext.jsx';
import './SortFilter.css';

export default function SortFilter() {
    const { setFilters, setQry } = useMeetup();
    const [localFilters, setLocalFilters] = useState({
        minVotes: ' ',
        order: 'createdAt',
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLocalFilters((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // Actualiza los filtros globales y la query string
        setFilters(localFilters);
        setQry(new URLSearchParams(localFilters).toString());
        console.log('Filtros enviados:', localFilters);
    };
    return (
        <form className="sort-form" onSubmit={handleSubmit}>
            <div className="filters-sort">
                <input
                    type="number"
                    name="minVotes"
                    placeholder="minimo de votos"
                    value={localFilters.minVotes || ''}
                    onChange={handleInputChange}
                />
                <select
                    name="order"
                    id="order"
                    value={localFilters.order || ''}
                    onChange={handleInputChange}
                >
                    <option value="createdAt">
                        Ordenar por fecha de creación
                    </option>
                    <option value="votes">Ordenar por número de votos</option>
                </select>
                <button type="submit">Ordernación</button>
            </div>
        </form>
    );
}
