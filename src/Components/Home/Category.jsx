import { useEffect } from 'react';
import { useMeetup } from '../../MeetupContext.jsx';

import './Category.css';

const Category = () => {
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

    const buttonStyle = (categoryId) => ({
        backgroundColor:
            filters.category === categoryId
                ? 'rgba(0, 0, 0, 0.731)'
                : 'hsla(0, 0%, 100%, 0.797)', // Color por defecto o cuando está seleccionado
        color: filters.category === categoryId ? 'white' : 'black', // Color del texto dependiendo de si está seleccionado
    });

    return (
        <div className="buttoms-categories">
            <button
                name="category"
                value=""
                onClick={handleFilterChange}
                style={buttonStyle('')}
            >
                Todas
            </button>
            <button
                name="category"
                value="1"
                onClick={handleFilterChange}
                style={buttonStyle('1')}
            >
                Viajes y aire libre
            </button>
            <button
                name="category"
                value="2"
                onClick={handleFilterChange}
                style={buttonStyle('2')}
            >
                Tecnología
            </button>
            <button
                name="category"
                value="3"
                onClick={handleFilterChange}
                style={buttonStyle('3')}
            >
                Salud y bienestar
            </button>
            <button
                name="category"
                value="4"
                onClick={handleFilterChange}
                style={buttonStyle('4')}
            >
                Juegos
            </button>
            <button
                name="category"
                value="5"
                onClick={handleFilterChange}
                style={buttonStyle('5')}
            >
                Deportes y fitness
            </button>
            <button
                name="category"
                value="6"
                onClick={handleFilterChange}
                style={buttonStyle('6')}
            >
                Arte y cultura
            </button>
            <button
                name="category"
                value="7"
                onClick={handleFilterChange}
                style={buttonStyle('7')}
            >
                Aficiones y pasiones
            </button>
        </div>
    );
};

export default Category;
