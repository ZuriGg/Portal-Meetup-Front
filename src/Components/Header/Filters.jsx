import { useEffect } from 'react';
import { useMeetup } from '../../MeetupContext.jsx';

const Filters = () => {
    const { filters, setFilters, loading, setQry } = useMeetup();
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters, // Conservamos los filtros anteriores
            [name]: value, // Actualizamos el filtro específico con el nuevo valor
        }));
    };

    useEffect(() => {
        if (!loading) {
            setQry(
                new URLSearchParams({
                    ...filters,
                }).toString()
            );
            console.log('Filtros:', filters);
        }
    }, [filters, setQry, loading]);
    return (
        <div className="filters">
            <input
                type="text"
                name="search"
                placeholder="Buscar meetups!"
                value={filters.search || ''}
                onChange={handleFilterChange}
            />
            {/* <input
                type="number"
                name="minVotes"
                placeholder="por numero de votos"
                value={filters.minVotes || ''}
                onChange={handleFilterChange}
            /> */}
            <input
                type="text"
                name="location"
                placeholder="Buscar meetups! por ubicacion"
                value={filters.location || ''}
                onChange={handleFilterChange}
            />
            {/* <select
                name="category"
                value={filters.category || ''}
                onChange={handleFilterChange}
            >
                <option value="">categoria</option>
                <option value="1">Viajes y aire libre</option>
                <option value="2">Tecnología</option>
                <option value="3">Salud y bienestar</option>
                <option value="4">Juegos</option>
                <option value="5">Deportes y fitness</option>
                <option value="6">Arte y cultura</option>
                <option value="7">Aficiones y pasiones</option>
            </select> */}
            <div
                type="text"
                onChange={() =>
                    setFilters((prevFilters) => ({
                        ...prevFilters,
                        filtersChange: true,
                    }))
                }
            />
        </div>
    );
};

export default Filters;
